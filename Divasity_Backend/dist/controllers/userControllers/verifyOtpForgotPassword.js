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
exports.verifyResetPasswordOtpWithNewPassword = void 0;
const models_1 = require("../../models");
const Otp_1 = require("../../models/Otp");
const password_1 = require("../../services/password");
const verifyResetPasswordOtpWithNewPassword = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, new_password } = request.body;
    // Validate inputs
    if (!otp || !new_password) {
        response.status(400).json({
            error: true,
            message: "OTP and new password are required.",
        });
        return;
    }
    try {
        // Find OTP (only email type)
        const otpRecord = yield Otp_1.Otp.findOne({
            where: { otp_code: otp },
        });
        if (!otpRecord) {
            response.status(400).json({
                error: true,
                message: "Invalid OTP.",
            });
            return;
        }
        if (new Date() > otpRecord.otp_expiry) {
            response.status(400).json({
                error: true,
                message: "OTP has expired.",
            });
            return;
        }
        // Get the user associated with the OTP
        const user = yield models_1.User.findByPk(otpRecord.user_id);
        if (!user) {
            response.status(404).json({
                error: true,
                message: "User not found.",
            });
            return;
        }
        // Update user's password
        user.password = yield (0, password_1.hashPassword)(new_password);
        yield user.save();
        // Remove all OTPs related to the user
        yield Otp_1.Otp.destroy({ where: { user_id: user.id } });
        response.status(200).json({
            error: false,
            message: "Password has been successfully updated.",
        });
    }
    catch (error) {
        response.status(500).json({
            error: true,
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
});
exports.verifyResetPasswordOtpWithNewPassword = verifyResetPasswordOtpWithNewPassword;
