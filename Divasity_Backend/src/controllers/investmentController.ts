import { Request, Response } from 'express';
import { sendEmail } from '../config/emailConfig';
import { Investment, User, Project, Notification } from '../models';

// Extend Request interface to match the one in auth middleware
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const investInProject = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const { projectId, amount } = req.body;

    // Validate inputs
    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing projectId' });
    }
    if (!amount || (typeof amount !== 'number' && typeof amount !== 'string') || isNaN(parseFloat(amount.toString()))) {
      return res.status(400).json({ error: 'Invalid or missing amount' });
    }

    const parsedAmount = parseFloat(amount.toString()); // Convert to number for calculations
    if (parsedAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than zero' });
    }

    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const investment = await Investment.create({
      userId: req.user.id,
      projectId,
      amount: parsedAmount.toFixed(2), // Store as string with 2 decimal places
    });

    // Update project's totalMoneyInvested
    project.totalMoneyInvested = (parseFloat(project.totalMoneyInvested) + parsedAmount).toFixed(2);
    if (parseFloat(project.totalMoneyInvested) >= parseFloat(project.expectedRaiseAmount)) {
      project.status = 'FUNDED';
    }
    await project.save();

    // Notify investor
    await Notification.create({
      UserId: req.user.id,
      message: `You have invested $${parsedAmount.toFixed(2)} in "${project.name}".`,
      isRead: false,
    });

    // Notify project creator
    await Notification.create({
      UserId: project.userId,
      message: `Investor has contributed $${parsedAmount.toFixed(2)} to your project "${project.name}".`,
      isRead: false,
    });

    // Send emails
    const investor = await User.findByPk(req.user.id);
    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }
    const creator = await User.findByPk(project.userId);
    if (!creator) {
      return res.status(404).json({ error: 'Project creator not found' });
    }
    await sendEmail(
      investor.email,
      'Investment Confirmation',
      `You have invested $${parsedAmount.toFixed(2)} in "${project.name}".`
    );
    await sendEmail(
      creator.email,
      'New Investment',
      `An investor has contributed $${parsedAmount.toFixed(2)} to your project "${project.name}".`
    );

    res.status(201).json(investment);
  } catch (error) {
    console.error('Error processing investment:', error);
    res.status(500).json({ error: 'Failed to process investment' });
  }
};

export const getUserInvestments = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const investments = await Investment.findAll({
      where: { userId: req.user.id },
      include: [{ model: Project }],
    });
    res.status(200).json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
};

export const getInvestmentStats = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const investments = await Investment.findAll({
      where: { userId: req.user.id },
      include: [{ model: Project }],
    });

    const stats = {
      totalInvestments: investments.length,
      totalInvestedAmount: investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0),
      totalReturnAmount: investments.reduce((sum, inv) => sum + parseFloat(inv.returnAmount || '0'), 0),
      averageSuccessRate:
        investments.length > 0
          ? investments.reduce((sum, inv) => sum + (inv.successRate || 0), 0) / investments.length
          : 0,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching investment stats:', error);
    res.status(500).json({ error: 'Failed to fetch investment stats' });
  }
};

export const updateInvestmentOutcome = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    // Check if req.user exists and is ADMIN
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized: Admin access required' });
    }

    const { investmentId, returnAmount, successRate } = req.body;

    // Validate inputs
    if (!investmentId || typeof investmentId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing investmentId' });
    }
    if (returnAmount == null || (typeof returnAmount !== 'number' && typeof returnAmount !== 'string') || isNaN(parseFloat(returnAmount.toString()))) {
      return res.status(400).json({ error: 'Invalid or missing returnAmount' });
    }
    if (successRate == null || (typeof successRate !== 'number' && typeof successRate !== 'string') || isNaN(parseFloat(successRate.toString()))) {
      return res.status(400).json({ error: 'Invalid or missing successRate' });
    }

    const parsedReturnAmount = parseFloat(returnAmount.toString());
    const parsedSuccessRate = parseFloat(successRate.toString());

    const investment = await Investment.findByPk(investmentId);
    if (!investment) return res.status(404).json({ error: 'Investment not found' });

    await investment.update({
      returnAmount: parsedReturnAmount.toFixed(2), // Store as string with 2 decimal places
      successRate: parsedSuccessRate,
    });

    // Notify investor
    await Notification.create({
      UserId: investment.userId,
      message: `Your investment in project has a return of $${parsedReturnAmount.toFixed(2)} with a success rate of ${parsedSuccessRate}%.`,
      isRead: false,
    });

    // Send email
    const investor = await User.findByPk(investment.userId);
    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }
    await sendEmail(
      investor.email,
      'Investment Update',
      `Your investment has a return of $${parsedReturnAmount.toFixed(2)} with a success rate of ${parsedSuccessRate}%.`
    );

    res.status(200).json(investment);
  } catch (error) {
    console.error('Error updating investment outcome:', error);
    res.status(500).json({ error: 'Failed to update investment outcome' });
  }
};