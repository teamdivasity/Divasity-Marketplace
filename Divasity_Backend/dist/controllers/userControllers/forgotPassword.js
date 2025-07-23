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
exports.forgotPassword = void 0;
const models_1 = require("../../models");
const Otp_1 = require("../../models/Otp");
const uuid_1 = require("uuid");
const generateOtp_1 = require("../../services/generateOtp");
const expiryTime_1 = require("../../services/expiryTime");
const emailOtpVerification_1 = require("../../services/emailOtpVerification");
const forgotPassword = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    if (!email) {
        response.status(400).json({
            error: true,
            message: "Email is required"
        });
        return;
    }
    try {
        //check if email already exist
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            response.status(400).json({
                error: true,
                message: `${email} does not exist`
            });
            return;
        }
        //Generate OTP and Store int the database
        const OTP = String((0, generateOtp_1.generateOTP)());
        const id = (0, uuid_1.v4)();
        yield Otp_1.Otp.create({
            id,
            user_id: user.id,
            otp_code: OTP,
            otp_expiry: (0, expiryTime_1.expiryTime)(10),
        });
        //Send OTP to the user email
        yield (0, emailOtpVerification_1.emailOTPVerification)(OTP, email);
        response.status(200).json({
            error: false,
            message: `OTP has been sent to ${email}`
        });
    }
    catch (error) {
        response.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error.message
        });
        return;
    }
});
exports.forgotPassword = forgotPassword;
