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
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
// import Project from '../models/Project';
// import Investment from '../models/Investment';
const emailConfig_1 = require("../config/emailConfig");
// import Notification from '../models/Notifications'; // Fixed import (changed 'Notifications' to 'Notification' to match model)
// import User from '../models/User';
const models_1 = require("../models");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
        const { name, category, expectedRaiseAmount, description, startDate, endDate } = req.body;
        const userId = req.user.id;
        const project = yield models_1.Project.create({
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
        yield models_1.Notification.create({
            UserId: userId,
            message: `Your project "${name}" has been created successfully.`,
            isRead: false,
        });
        // Send email
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield (0, emailConfig_1.sendEmail)(user.email, 'Project Created', `Your project "${name}" has been created successfully.`);
        res.status(201).json(project);
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});
exports.createProject = createProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield models_1.Project.findAll();
        res.status(200).json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
exports.getAllProjects = getAllProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.Project.findByPk(req.params.id);
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
        const project = yield models_1.Project.findByPk(req.params.id);
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        // Only project creator can update
        if (project.userId !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });
        yield project.update(req.body);
        // Notify creator
        yield models_1.Notification.create({
            UserId: project.userId,
            message: `Your project "${project.name}" has been updated.`,
            isRead: false,
        });
        // Send email
        const user = yield models_1.User.findByPk(project.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield (0, emailConfig_1.sendEmail)(user.email, 'Project Updated', `Your project "${project.name}" has been updated.`);
        res.status(200).json(project);
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
        const project = yield models_1.Project.findByPk(req.params.id);
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        // Only project creator can delete
        if (project.userId !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });
        yield project.destroy();
        // Notify creator
        yield models_1.Notification.create({
            UserId: project.userId,
            message: `Your project "${project.name}" has been deleted.`,
            isRead: false,
        });
        // Send email
        const user = yield models_1.User.findByPk(project.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield (0, emailConfig_1.sendEmail)(user.email, 'Project Deleted', `Your project "${project.name}" has been deleted.`);
        res.status(204).json();
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});
exports.deleteProject = deleteProject;
