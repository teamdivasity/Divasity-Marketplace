"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appSecret = process.env.JWT_SECRET;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, appSecret, { expiresIn: "24h" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, appSecret);
        return { valid: true, decoded };
    }
    catch (error) {
        return { valid: false, error: error.message };
    }
};
exports.verifyToken = verifyToken;
