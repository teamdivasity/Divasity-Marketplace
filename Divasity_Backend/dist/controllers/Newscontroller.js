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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNews = exports.deleteNews = exports.createNews = exports.authAdmin = void 0;
const News_1 = __importDefault(require("../models/News"));
const models_1 = require("../models");
// import Notification from "../models/Notifications";
const token_1 = require("../services/token");
// Combined auth and admin check middleware
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // 1. Check for token
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            throw new Error("Authentication required");
        // 2. Verify token
        const { valid, decoded } = yield (0, token_1.verifyToken)(token);
        if (!valid || !decoded)
            throw new Error("Invalid token");
        // 3. Check admin role
        if (decoded.role !== 'admin')
            throw new Error("Admin access required");
        // Attach user to request
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: true,
            message: error.message
        });
    }
});
exports.authAdmin = authAdmin;
// Simplified create news endpoint
exports.createNews = [
    exports.authAdmin, // Middleware
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Validate input
            if (!req.body.Newstitle || !req.body.Newscontent) {
                return res.status(400).json({
                    error: true,
                    message: "Title and content are required"
                });
            }
            // Create news
            const news = yield News_1.default.create({
                UserId: req.user.id,
                Newstitle: req.body.Newstitle,
                Newscontent: req.body.Newscontent,
                Newsimage: req.body.Newsimage || null,
                links: req.body.links || null,
                categories: req.body.categories || []
            });
            // Create notifications for non-admin users
            const users = yield models_1.User.findAll({ where: { role: 'user' } });
            const notificationData = users.map((u) => ({
                UserId: u.id,
                NewsId: news.Newsid,
                message: `New news posted: ${news.Newstitle}`,
                isRead: false,
            }));
            yield models_1.Notification.bulkCreate(notificationData);
            // Log for debugging
            console.log('News created:', news.toJSON());
            console.log('Notifications created for:', users.length, 'users');
            res.status(201).json({
                error: false,
                data: news
            });
        }
        catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    })
];
// Simplified delete news endpoint
exports.deleteNews = [
    exports.authAdmin, // Middleware
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield News_1.default.destroy({
                where: {
                    Newsid: req.params.Newsid,
                    UserId: req.user.id
                }
            });
            if (!deleted)
                throw new Error("News not found");
            res.json({ success: true });
        }
        catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    })
];
// Get all news endpoint
const getAllNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield News_1.default.findAll({
            attributes: ['Newsid', 'UserId', 'Newstitle', 'Newscontent', 'Newsimage', 'links', 'categories', 'createdAt', 'updatedAt']
        });
        return res.status(200).json({
            error: false,
            message: "News retrieved successfully",
            data: news
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error.message
        });
    }
});
exports.getAllNews = getAllNews;
