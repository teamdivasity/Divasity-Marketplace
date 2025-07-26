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
exports.authController = exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Otp_1 = require("../models/Otp");
const emailService_1 = require("../services/emailService");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, userName, email, password, role = User_1.UserRole.USER } = req.body;
                // Check if user exists
                const existingUser = yield User_1.User.findOne({
                    where: { email }
                });
                if (existingUser) {
                    res.status(400).json({
                        success: false,
                        message: 'User already exists with this email',
                        statusCode: 400
                    });
                    return;
                }
                // Hash password
                const hashedPassword = yield bcrypt_1.default.hash(password, 12);
                // Create user
                const user = yield User_1.User.create({
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: hashedPassword,
                    role
                });
                // Generate email verification OTP
                const otpRecord = yield Otp_1.Otp.createOtp({
                    userId: user.id,
                    email: user.email,
                    type: Otp_1.OtpType.EMAIL_VERIFICATION,
                    expiryMinutes: 10,
                    ipAddress: req.ip,
                    userAgent: req.get('User-Agent')
                });
                // Send verification email
                yield emailService_1.emailService.sendOtpEmail(user.email, otpRecord.otp, Otp_1.OtpType.EMAIL_VERIFICATION);
                res.status(201).json({
                    success: true,
                    message: 'User registered successfully. Please check your email for verification code.',
                    data: {
                        userId: user.id,
                        email: user.email,
                        requiresEmailVerification: true
                    },
                    statusCode: 201
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Registration failed',
                    error: error.message,
                    statusCode: 500
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Find user
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid credentials',
                        statusCode: 401
                    });
                    return;
                }
                // Check password
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid credentials',
                        statusCode: 401
                    });
                    return;
                }
                // Check if email is verified
                if (!user.isEmailVerified) {
                    // Generate new OTP
                    const otpRecord = yield Otp_1.Otp.createOtp({
                        userId: user.id,
                        email: user.email,
                        type: Otp_1.OtpType.EMAIL_VERIFICATION,
                        expiryMinutes: 10,
                        ipAddress: req.ip,
                        userAgent: req.get('User-Agent')
                    });
                    yield emailService_1.emailService.sendOtpEmail(user.email, otpRecord.otp, Otp_1.OtpType.EMAIL_VERIFICATION);
                    res.status(403).json({
                        success: false,
                        message: 'Email not verified. New verification code sent.',
                        data: {
                            userId: user.id,
                            requiresEmailVerification: true
                        },
                        statusCode: 403
                    });
                    return;
                }
                // Generate login OTP for additional security
                const loginOtp = yield Otp_1.Otp.createOtp({
                    userId: user.id,
                    email: user.email,
                    type: Otp_1.OtpType.LOGIN_VERIFICATION,
                    expiryMinutes: 5,
                    ipAddress: req.ip,
                    userAgent: req.get('User-Agent')
                });
                yield emailService_1.emailService.sendOtpEmail(user.email, loginOtp.otp, Otp_1.OtpType.LOGIN_VERIFICATION);
                res.status(200).json({
                    success: true,
                    message: 'Login verification code sent to your email',
                    data: {
                        userId: user.id,
                        requiresLoginVerification: true
                    },
                    statusCode: 200
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Login failed',
                    error: error.message,
                    statusCode: 500
                });
            }
        });
    }
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const verification = yield Otp_1.Otp.verifyOtp({
                    otp,
                    email,
                    type: Otp_1.OtpType.EMAIL_VERIFICATION
                });
                if (!verification.success) {
                    res.status(400).json({
                        success: false,
                        message: verification.message,
                        statusCode: 400
                    });
                    return;
                }
                // Update user verification status
                yield User_1.User.update({ isEmailVerified: true }, { where: { email } });
                res.status(200).json({
                    success: true,
                    message: 'Email verified successfully',
                    statusCode: 200
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Email verification failed',
                    error: error.message,
                    statusCode: 500
                });
            }
        });
    }
    verifyLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const verification = yield Otp_1.Otp.verifyOtp({
                    otp,
                    email,
                    type: Otp_1.OtpType.LOGIN_VERIFICATION
                });
                if (!verification.success) {
                    res.status(400).json({
                        success: false,
                        message: verification.message,
                        statusCode: 400
                    });
                    return;
                }
                // Get user
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'User not found',
                        statusCode: 404
                    });
                    return;
                }
                // Update last login
                yield user.update({ lastLoginAt: new Date() });
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({
                    userId: user.id,
                    email: user.email,
                    role: user.role
                }, process.env.JWT_SECRET || 'default-secret', { expiresIn: '7d' });
                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    data: {
                        token,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                            email: user.email,
                            role: user.role,
                            profilePicture: user.profilePicture,
                            isVerified: user.isVerified
                        }
                    },
                    statusCode: 200
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Login verification failed',
                    error: error.message,
                    statusCode: 500
                });
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'User not found',
                        statusCode: 404
                    });
                    return;
                }
                const otpRecord = yield Otp_1.Otp.createOtp({
                    userId: user.id,
                    email: user.email,
                    type: Otp_1.OtpType.PASSWORD_RESET,
                    expiryMinutes: 15,
                    ipAddress: req.ip,
                    userAgent: req.get('User-Agent')
                });
                yield emailService_1.emailService.sendOtpEmail(user.email, otpRecord.otp, Otp_1.OtpType.PASSWORD_RESET);
                res.status(200).json({
                    success: true,
                    message: 'Password reset code sent to your email',
                    statusCode: 200
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Password reset request failed',
                    error: error.message,
                    statusCode: 500
                });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp, newPassword } = req.body;
                const verification = yield Otp_1.Otp.verifyOtp({
                    otp,
                    email,
                    type: Otp_1.OtpType.PASSWORD_RESET
                });
                if (!verification.success) {
                    res.status(400).json({
                        success: false,
                        message: verification.message,
                        statusCode: 400
                    });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
                yield User_1.User.update({ password: hashedPassword }, { where: { email } });
                res.status(200).json({
                    success: true,
                    message: 'Password reset successfully',
                    statusCode: 200
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Password reset failed',
                    error: error.message,
                    statusCode: 500
                });
            }
        });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
