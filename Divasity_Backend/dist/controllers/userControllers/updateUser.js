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
exports.updateUser = void 0;
const models_1 = require("../../models");
const token_1 = require("../../services/token");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userName, telephone } = req.body;
        // Validate input
        if (!userName && !telephone) {
            return res.status(400).json({
                error: true,
                message: "At least one field (username, telephone) must be provided",
            });
        }
        // Verify token to ensure user is updating their own profile
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: true,
                message: "Authentication token required",
            });
        }
        const token = authHeader.split(' ')[1];
        const result = yield (0, token_1.verifyToken)(token);
        if (!result.valid || !result.decoded || result.decoded.id !== id) {
            return res.status(403).json({
                error: true,
                message: "Access denied: You can only update your own profile",
            });
        }
        // Find user
        const user = yield models_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        // Validate username uniqueness if provided
        if (userName && userName !== user.userName) {
            const existingUser = yield models_1.User.findOne({ where: { userName } });
            if (existingUser) {
                return res.status(400).json({
                    error: true,
                    message: "Username is already in use",
                });
            }
        }
        // Update user
        const updates = {};
        if (userName)
            updates.userName = userName;
        if (telephone)
            updates.telephone = telephone;
        yield user.update(updates);
        return res.status(200).json({
            error: false,
            message: "User updated successfully",
            data: {
                id: user.id,
                username: user.username,
                telephone: user.telephone,
            },
        });
    }
    catch (error) {
        console.error('Update user error:', error.message);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            errorMessage: error.message,
        });
    }
});
exports.updateUser = updateUser;
