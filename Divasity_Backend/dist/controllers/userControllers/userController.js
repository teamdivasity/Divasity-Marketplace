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
exports.getUserById = exports.getAllUsers = void 0;
const models_1 = require("../../models");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll({
            attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'telephone', 'role', 'isVerified'],
        });
        return res.status(200).json({
            error: false,
            message: "Users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        console.error('Get all users error:', error.message);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            errorMessage: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield models_1.User.findByPk(id, {
            attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'telephone', 'role', 'isVerified'],
        });
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        return res.status(200).json({
            error: false,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        console.error('Get user by ID error:', error.message);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            errorMessage: error.message,
        });
    }
});
exports.getUserById = getUserById;
