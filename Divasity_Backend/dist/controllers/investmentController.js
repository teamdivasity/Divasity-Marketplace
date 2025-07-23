"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvestmentOutcome = exports.getInvestmentStats = exports.getUserInvestments = exports.investInProject = void 0;
const emailConfig_1 = require("../config/emailConfig");
const models_1 = require("../models");
const investInProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const project = yield models_1.Project.findByPk(projectId);
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        const investment = yield models_1.Investment.create({
            userId: req.user.id,
            projectId,
            amount: parsedAmount.toFixed(2), // Store as string with 2 decimal places
        });
        // Update project's totalMoneyInvested
        project.totalMoneyInvested = (parseFloat(project.totalMoneyInvested) + parsedAmount).toFixed(2);
        if (parseFloat(project.totalMoneyInvested) >= parseFloat(project.expectedRaiseAmount)) {
            project.status = 'FUNDED';
        }
        yield project.save();
        // Notify investor
        yield models_1.Notification.create({
            UserId: req.user.id,
            message: `You have invested $${parsedAmount.toFixed(2)} in "${project.name}".`,
            isRead: false,
        });
        // Notify project creator
        yield models_1.Notification.create({
            UserId: project.userId,
            message: `Investor has contributed $${parsedAmount.toFixed(2)} to your project "${project.name}".`,
            isRead: false,
        });
        // Send emails
        const investor = yield models_1.User.findByPk(req.user.id);
        if (!investor) {
            return res.status(404).json({ error: 'Investor not found' });
        }
        const creator = yield models_1.User.findByPk(project.userId);
        if (!creator) {
            return res.status(404).json({ error: 'Project creator not found' });
        }
        yield (0, emailConfig_1.sendEmail)(investor.email, 'Investment Confirmation', `You have invested $${parsedAmount.toFixed(2)} in "${project.name}".`);
        yield (0, emailConfig_1.sendEmail)(creator.email, 'New Investment', `An investor has contributed $${parsedAmount.toFixed(2)} to your project "${project.name}".`);
        res.status(201).json(investment);
    }
    catch (error) {
        console.error('Error processing investment:', error);
        res.status(500).json({ error: 'Failed to process investment' });
    }
});
exports.investInProject = investInProject;
const getUserInvestments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
        const investments = yield models_1.Investment.findAll({
            where: { userId: req.user.id },
            include: [{ model: models_1.Project }],
        });
        res.status(200).json(investments);
    }
    catch (error) {
        console.error('Error fetching investments:', error);
        res.status(500).json({ error: 'Failed to fetch investments' });
    }
});
exports.getUserInvestments = getUserInvestments;
const getInvestmentStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
        const investments = yield models_1.Investment.findAll({
            where: { userId: req.user.id },
            include: [{ model: models_1.Project }],
        });
        const stats = {
            totalInvestments: investments.length,
            totalInvestedAmount: investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0),
            totalReturnAmount: investments.reduce((sum, inv) => sum + parseFloat(inv.returnAmount || '0'), 0),
            averageSuccessRate: investments.length > 0
                ? investments.reduce((sum, inv) => sum + (inv.successRate || 0), 0) / investments.length
                : 0,
        };
        res.status(200).json(stats);
    }
    catch (error) {
        console.error('Error fetching investment stats:', error);
        res.status(500).json({ error: 'Failed to fetch investment stats' });
    }
});
exports.getInvestmentStats = getInvestmentStats;
const updateInvestmentOutcome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const investment = yield models_1.Investment.findByPk(investmentId);
        if (!investment)
            return res.status(404).json({ error: 'Investment not found' });
        yield investment.update({
            returnAmount: parsedReturnAmount.toFixed(2), // Store as string with 2 decimal places
            successRate: parsedSuccessRate,
        });
        // Notify investor
        yield models_1.Notification.create({
            UserId: investment.userId,
            message: `Your investment in project has a return of $${parsedReturnAmount.toFixed(2)} with a success rate of ${parsedSuccessRate}%.`,
            isRead: false,
        });
        // Send email
        const investor = yield models_1.User.findByPk(investment.userId);
        if (!investor) {
            return res.status(404).json({ error: 'Investor not found' });
        }
        yield (0, emailConfig_1.sendEmail)(investor.email, 'Investment Update', `Your investment has a return of $${parsedReturnAmount.toFixed(2)} with a success rate of ${parsedSuccessRate}%.`);
        res.status(200).json(investment);
    }
    catch (error) {
        console.error('Error updating investment outcome:', error);
        res.status(500).json({ error: 'Failed to update investment outcome' });
    }
});
exports.updateInvestmentOutcome = updateInvestmentOutcome;
