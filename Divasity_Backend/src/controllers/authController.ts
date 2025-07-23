import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/User';
import { Otp, OtpType } from '../models/Otp';
import { emailService } from '../services/emailService';
import { ApiResponse } from '../types';

export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, userName, email, password, role = UserRole.USER } = req.body;

            // Check if user exists
            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                res.status(400).json({
                    success: false,
                    message: 'User already exists with this email',
                    statusCode: 400
                } as ApiResponse);
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user
            const user = await User.create({
                firstName,
                lastName,
                userName,
                email,
                password: hashedPassword,
                role
            });

            // Generate email verification OTP
            const otpRecord = await Otp.createOtp({
                userId: user.id,
                email: user.email,
                type: OtpType.EMAIL_VERIFICATION,
                expiryMinutes: 10,
                ipAddress: req.ip,
                userAgent: req.get('User-Agent')
            });

            // Send verification email
            await emailService.sendOtpEmail(user.email, otpRecord.otp, OtpType.EMAIL_VERIFICATION);

            res.status(201).json({
                success: true,
                message: 'User registered successfully. Please check your email for verification code.',
                data: {
                    userId: user.id,
                    email: user.email,
                    requiresEmailVerification: true
                },
                statusCode: 201
            } as ApiResponse);

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Registration failed',
                error: error.message,
                statusCode: 500
            } as ApiResponse);
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                    statusCode: 401
                } as ApiResponse);
                return;
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                    statusCode: 401
                } as ApiResponse);
                return;
            }

            // Check if email is verified
            if (!user.isEmailVerified) {
                // Generate new OTP
                const otpRecord = await Otp.createOtp({
                    userId: user.id,
                    email: user.email,
                    type: OtpType.EMAIL_VERIFICATION,
                    expiryMinutes: 10,
                    ipAddress: req.ip,
                    userAgent: req.get('User-Agent')
                });

                await emailService.sendOtpEmail(user.email, otpRecord.otp, OtpType.EMAIL_VERIFICATION);

                res.status(403).json({
                    success: false,
                    message: 'Email not verified. New verification code sent.',
                    data: {
                        userId: user.id,
                        requiresEmailVerification: true
                    },
                    statusCode: 403
                } as ApiResponse);
                return;
            }

            // Generate login OTP for additional security
            const loginOtp = await Otp.createOtp({
                userId: user.id,
                email: user.email,
                type: OtpType.LOGIN_VERIFICATION,
                expiryMinutes: 5,
                ipAddress: req.ip,
                userAgent: req.get('User-Agent')
            });

            await emailService.sendOtpEmail(user.email, loginOtp.otp, OtpType.LOGIN_VERIFICATION);

            res.status(200).json({
                success: true,
                message: 'Login verification code sent to your email',
                data: {
                    userId: user.id,
                    requiresLoginVerification: true
                },
                statusCode: 200
            } as ApiResponse);

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Login failed',
                error: error.message,
                statusCode: 500
            } as ApiResponse);
        }
    }

    async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;

            const verification = await Otp.verifyOtp({
                otp,
                email,
                type: OtpType.EMAIL_VERIFICATION
            });

            if (!verification.success) {
                res.status(400).json({
                    success: false,
                    message: verification.message,
                    statusCode: 400
                } as ApiResponse);
                return;
            }

            // Update user verification status
            await User.update(
                { isEmailVerified: true },
                { where: { email } }
            );

            res.status(200).json({
                success: true,
                message: 'Email verified successfully',
                statusCode: 200
            } as ApiResponse);

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Email verification failed',
                error: error.message,
                statusCode: 500
            } as ApiResponse);
        }
    }

    async verifyLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;

            const verification = await Otp.verifyOtp({
                otp,
                email,
                type: OtpType.LOGIN_VERIFICATION
            });

            if (!verification.success) {
                res.status(400).json({
                    success: false,
                    message: verification.message,
                    statusCode: 400
                } as ApiResponse);
                return;
            }

            // Get user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                    statusCode: 404
                } as ApiResponse);
                return;
            }

            // Update last login
            await user.update({ lastLoginAt: new Date() });

            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    email: user.email, 
                    role: user.role 
                },
                process.env.JWT_SECRET || 'default-secret',
                { expiresIn: '7d' }
            );

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
            } as ApiResponse);

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Login verification failed',
                error: error.message,
                statusCode: 500
            } as ApiResponse);
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                    statusCode: 404
                } as ApiResponse);
                return;
            }

            const otpRecord = await Otp.createOtp({
                userId: user.id,
                email: user.email,
                type: OtpType.PASSWORD_RESET,
                expiryMinutes: 15,
                ipAddress: req.ip,
                userAgent: req.get('User-Agent')
            });

            await emailService.sendOtpEmail(user.email, otpRecord.otp, OtpType.PASSWORD_RESET);

            res.status(200).json({
                success: true,
                message: 'Password reset code sent to your email',
                statusCode: 200
            } as ApiResponse);

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Password reset request failed',
                error: error.message,
                statusCode: 500
            } as ApiResponse);
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp, newPassword } = req.body;

            const verification = await Otp.verifyOtp({
                otp,
                email,
                type: OtpType.PASSWORD_RESET
            });

            if (!verification.success) {
                res.status(400).json({
                    success: false,
                    message: verification.message,
                    statusCode: 400
                } as ApiResponse);
                return;
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            
            await User.update(
                { password: hashedPassword },
                { where: { email } }
            );

            res.status(200).json({
                success: true,
                message: 'Password reset successfully',
                statusCode: 200
            } as ApiResponse);

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Password reset failed',
                error: error.message,
                statusCode: 500
            } as ApiResponse);
        }
    }
}

export const authController = new AuthController();