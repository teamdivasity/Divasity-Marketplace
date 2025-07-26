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
exports.emailService = exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Otp_1 = require("../models/Otp");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransporter({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    sendOtpEmail(email, otp, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subject = this.getEmailSubject(type);
                const html = this.getEmailTemplate(otp, type);
                yield this.transporter.sendMail({
                    from: `"Divasity Marketplace" <${process.env.SMTP_USER}>`,
                    to: email,
                    subject,
                    html
                });
                return true;
            }
            catch (error) {
                console.error('Email sending failed:', error);
                return false;
            }
        });
    }
    getEmailSubject(type) {
        switch (type) {
            case Otp_1.OtpType.EMAIL_VERIFICATION:
                return 'Verify Your Email - Divasity Marketplace';
            case Otp_1.OtpType.PASSWORD_RESET:
                return 'Reset Your Password - Divasity Marketplace';
            case Otp_1.OtpType.LOGIN_VERIFICATION:
                return 'Login Verification - Divasity Marketplace';
            default:
                return 'Verification Code - Divasity Marketplace';
        }
    }
    getEmailTemplate(otp, type) {
        const baseTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
                .otp-code { font-size: 32px; font-weight: bold; color: #7c3aed; text-align: center; 
                           background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">Divasity Marketplace</div>
                </div>
                <h2>${this.getEmailTitle(type)}</h2>
                <p>${this.getEmailMessage(type)}</p>
                <div class="otp-code">${otp}</div>
                <p>This code will expire in 10 minutes.</p>
                <div class="footer">
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>&copy; 2024 Divasity Marketplace. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
        return baseTemplate;
    }
    getEmailTitle(type) {
        switch (type) {
            case Otp_1.OtpType.EMAIL_VERIFICATION:
                return 'Verify Your Email Address';
            case Otp_1.OtpType.PASSWORD_RESET:
                return 'Reset Your Password';
            case Otp_1.OtpType.LOGIN_VERIFICATION:
                return 'Verify Your Login';
            default:
                return 'Verification Required';
        }
    }
    getEmailMessage(type) {
        switch (type) {
            case Otp_1.OtpType.EMAIL_VERIFICATION:
                return 'Please use the following code to verify your email address:';
            case Otp_1.OtpType.PASSWORD_RESET:
                return 'Please use the following code to reset your password:';
            case Otp_1.OtpType.LOGIN_VERIFICATION:
                return 'Please use the following code to complete your login:';
            default:
                return 'Please use the following verification code:';
        }
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
