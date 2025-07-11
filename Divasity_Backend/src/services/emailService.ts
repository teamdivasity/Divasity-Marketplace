import nodemailer from 'nodemailer';
import { OtpType } from '../models/Otp';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendOtpEmail(email: string, otp: string, type: OtpType): Promise<boolean> {
        try {
            const subject = this.getEmailSubject(type);
            const html = this.getEmailTemplate(otp, type);

            await this.transporter.sendMail({
                from: `"Divasity Marketplace" <${process.env.SMTP_USER}>`,
                to: email,
                subject,
                html
            });

            return true;
        } catch (error) {
            console.error('Email sending failed:', error);
            return false;
        }
    }

    private getEmailSubject(type: OtpType): string {
        switch (type) {
            case OtpType.EMAIL_VERIFICATION:
                return 'Verify Your Email - Divasity Marketplace';
            case OtpType.PASSWORD_RESET:
                return 'Reset Your Password - Divasity Marketplace';
            case OtpType.LOGIN_VERIFICATION:
                return 'Login Verification - Divasity Marketplace';
            default:
                return 'Verification Code - Divasity Marketplace';
        }
    }

    private getEmailTemplate(otp: string, type: OtpType): string {
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

    private getEmailTitle(type: OtpType): string {
        switch (type) {
            case OtpType.EMAIL_VERIFICATION:
                return 'Verify Your Email Address';
            case OtpType.PASSWORD_RESET:
                return 'Reset Your Password';
            case OtpType.LOGIN_VERIFICATION:
                return 'Verify Your Login';
            default:
                return 'Verification Required';
        }
    }

    private getEmailMessage(type: OtpType): string {
        switch (type) {
            case OtpType.EMAIL_VERIFICATION:
                return 'Please use the following code to verify your email address:';
            case OtpType.PASSWORD_RESET:
                return 'Please use the following code to reset your password:';
            case OtpType.LOGIN_VERIFICATION:
                return 'Please use the following code to complete your login:';
            default:
                return 'Please use the following verification code:';
        }
    }
}

export const emailService = new EmailService();