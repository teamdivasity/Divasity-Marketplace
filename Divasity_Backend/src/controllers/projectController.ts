import { Request, Response } from 'express';
// import Project from '../models/Project';
// import Investment from '../models/Investment';
import { sendEmail } from '../config/emailConfig';
// import Notification from '../models/Notifications'; // Fixed import (changed 'Notifications' to 'Notification' to match model)
// import User from '../models/User';
import { Project, User, Investment, Notification } from '../models';

// Extend Request interface to match the one in auth middleware
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const createProject = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const { name, category, expectedRaiseAmount, description, startDate, endDate } = req.body;
    const userId = req.user.id;

    const project = await Project.create({
      userId,
      name,
      category,
      expectedRaiseAmount,
      description,
      startDate,
      endDate,
      totalMoneyInvested: 0,
      status: 'OPEN',
    });

    // Notify the creator
    await Notification.create({
      UserId: userId,
      message: `Your project "${name}" has been created successfully.`,
      isRead: false,
    });

    // Send email
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await sendEmail(user.email, 'Project Created', `Your project "${name}" has been created successfully.`);

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getAllProjects = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const updateProject = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Only project creator can update
    if (project.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    await project.update(req.body);

    // Notify creator
    await Notification.create({
      UserId: project.userId,
      message: `Your project "${project.name}" has been updated.`,
      isRead: false,
    });

    // Send email
    const user = await User.findByPk(project.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await sendEmail(user.email, 'Project Updated', `Your project "${project.name}" has been updated.`);

    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Only project creator can delete
    if (project.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    await project.destroy();

    // Notify creator
    await Notification.create({
      UserId: project.userId,
      message: `Your project "${project.name}" has been deleted.`,
      isRead: false,
    });

    // Send email
    const user = await User.findByPk(project.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await sendEmail(user.email, 'Project Deleted', `Your project "${project.name}" has been deleted.`);

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};