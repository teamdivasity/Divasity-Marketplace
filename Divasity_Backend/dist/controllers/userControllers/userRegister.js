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
exports.resendOtp = exports.verifyOtp = exports.userRegister = void 0;
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const password_1 = require("../../services/password");
const generateOtp_1 = require("../../services/generateOtp");
const Otp_1 = __importDefault(require("../../models/Otp"));
const expiryTime_1 = require("../../services/expiryTime");
const emailOtpVerification_1 = require("../../services/emailOtpVerification");
const userRegister = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, password, address, userName, role, telephone } = request.body;
        // Check if email already exists
        const existingEmail = yield models_1.User.findOne({ where: { email } });
        if (existingEmail) {
            return response.status(400).json({
                error: true,
                message: `${email} already exists`,
            });
        }
        // Check if the phone number already exists
        const existingPhone = yield models_1.User.findOne({ where: { telephone } });
        if (existingPhone) {
            return response.status(400).json({
                error: true,
                message: `${telephone} already exists`,
            });
        }
        // Generate UUID and hash password
        const id = (0, uuid_1.v4)();
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        console.log('Creating user with data:', {
            id, email, firstName, userName, address, lastName, telephone
        });
        const newUser = yield models_1.User.create({
            id,
            email,
            firstName,
            userName,
            address,
            lastName,
            telephone,
            role,
            password: hashedPassword,
            IsVerified: false,
        });
        const emailOTP = String((0, generateOtp_1.generateOTP)());
        yield Otp_1.default.create({
            id: (0, uuid_1.v4)(),
            user_id: id,
            otp_code: emailOTP,
            otp_expiry: (0, expiryTime_1.expiryTime)(10),
        });
        // Temporarily disable email sending for testing
        // await emailOTPVerification(emailOTP, email);
        return response.status(200).json({
            error: false,
            message: "Registration successful, OTP created (email disabled for testing)",
            otp: emailOTP, // Only for testing - remove in production
        });
    }
    catch (error) {
        console.error('Registration error details:', error);
        return response.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
});
exports.userRegister = userRegister;
const verifyOtp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = request.body;
        // Validate input
        if (!email || !otp) {
            return response.status(400).json({
                error: true,
                message: "Email and OTP are required",
            });
        }
        // Find user by email
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            return response.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        // Check if user is already verified
        if (user.IsVerified) {
            return response.status(400).json({
                error: true,
                message: "User is already verified",
            });
        }
        // Find OTP record
        const otpRecord = yield Otp_1.default.findOne({
            where: { user_id: user.id, otp_code: otp },
        });
        if (!otpRecord) {
            return response.status(400).json({
                error: true,
                message: "Invalid OTP",
            });
        }
        // Check if OTP is expired
        const currentTime = new Date();
        if (currentTime > otpRecord.otp_expiry) {
            return response.status(400).json({
                error: true,
                message: "OTP has expired",
            });
        }
        // Update user verification status
        yield user.update({ IsVerified: true });
        // Optionally delete OTP record
        yield otpRecord.destroy();
        return response.status(200).json({
            error: false,
            message: "OTP verified successfully, user account activated",
            data: {
                id: user.id,
                email: user.email,
                userName: user.userName,
                IsVerified: user.IsVerified,
            },
        });
    }
    catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
});
exports.verifyOtp = verifyOtp;
const resendOtp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        // Validate input
        if (!email) {
            return response.status(400).json({
                error: true,
                message: "Email is required",
            });
        }
        // Find user by email
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            return response.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        // Check if user is already verified
        if (user.IsVerified) {
            return response.status(400).json({
                error: true,
                message: "User is already verified",
            });
        }
        // Delete any existing OTP records for the user
        yield Otp_1.default.destroy({ where: { user_id: user.id } });
        // Generate and save new OTP
        const emailOTP = String((0, generateOtp_1.generateOTP)());
        yield Otp_1.default.create({
            id: (0, uuid_1.v4)(),
            user_id: user.id,
            otp_code: emailOTP,
            otp_expiry: (0, expiryTime_1.expiryTime)(10),
        });
        // Send OTP via email
        yield (0, emailOtpVerification_1.emailOTPVerification)(emailOTP, email);
        return response.status(200).json({
            error: false,
            message: "New OTP sent to email",
        });
    }
    catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
});
exports.resendOtp = resendOtp;
