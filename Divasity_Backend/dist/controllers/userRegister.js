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
exports.userRegister = void 0;
const User_1 = __importDefault(require("../models/User"));
const uuid_1 = require("uuid");
const password_1 = require("../services/password");
const generateOtp_1 = require("../services/generateOtp");
const Otp_1 = __importDefault(require("../models/Otp"));
const expiryTime_1 = require("../services/expiryTime");
const emailOtpVerification_1 = require("../services/emailOtpVerification");
const userRegister = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, password, address, userName, telephone } = request.body;
        //check if email already exist 
        const existingEmail = yield User_1.default.findOne({ where: { email } });
        if (existingEmail) {
            response.status(400).json({
                error: true,
                message: `${email} already exist`
            });
            return;
        }
        //check if the phone number already exist
        const existingPhone = yield User_1.default.findOne({ where: { telephone } });
        if (existingPhone) {
            response.status(400).json({
                error: true,
                message: `${telephone} is already exist`
            });
            return;
        }
        //Generate UUID and hash password
        const id = (0, uuid_1.v4)();
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        const newUser = yield User_1.default.create({
            id,
            email,
            firstName,
            userName,
            address,
            lastName,
            telephone,
            role: "user",
            password: hashedPassword
        });
        const emailOTP = String((0, generateOtp_1.generateOTP)());
        yield Otp_1.default.create({
            id: (0, uuid_1.v4)(),
            user_id: id,
            otp_code: emailOTP,
            otp_expiry: (0, expiryTime_1.expiryTime)(10),
        });
        yield (0, emailOtpVerification_1.emailOTPVerification)(emailOTP, email);
        response.status(200).json({
            error: false,
            message: "Registration Succesfully, OTP sent to email"
        });
    }
    catch (error) {
        response.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error,
        });
    }
});
exports.userRegister = userRegister;
