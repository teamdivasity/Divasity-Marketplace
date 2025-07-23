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
exports.userLogin = void 0;
const models_1 = require("../../models");
const password_1 = require("../../services/password");
const token_1 = require("../../services/token");
const userLogin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // Validate user exists by email
        const user = yield models_1.User.findOne({ where: { email } });
        // Handle invalid email
        if (!user) {
            console.log('User not found for email:', email);
            return response.status(400).json({ error: true, message: "Invalid email" });
        }
        // Log user data to debug
        console.log('User found:', user.toJSON());
        // Validate provided password with the stored hashed password
        const validatepassword = yield (0, password_1.verifyPassword)(password, user.password);
        // Handle incorrect password
        if (!validatepassword) {
            console.log('Password validation failed for email:', email);
            return response.status(400).json({
                error: true,
                message: "Incorrect Password"
            });
        }
        // Check if user is verified
        if (!user.IsVerified) {
            console.log('User not verified for email:', email);
            return response.status(403).json({
                error: true,
                message: "Account not verified. Please verify your account to log in."
            });
        }
        // Prepare user info for token
        const userInfo = {
            id: user.id,
            email: user.email,
            telephone: user.telephone,
            role: user.role
        };
        // Prepare user data for response
        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        const token = (0, token_1.generateToken)(userInfo);
        return response.status(200).json({
            error: false,
            message: "User login successful",
            data: userData,
            token
        });
    }
    catch (error) {
        console.error('Login error:', error.message);
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            errorMessage: error.message
        });
    }
});
exports.userLogin = userLogin;
