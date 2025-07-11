import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

// Registration validation
const registerValidation = [
    body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),
    body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),
    body('userName').trim().isLength({ min: 3, max: 30 }).isAlphanumeric().withMessage('Username must be 3-30 alphanumeric characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage('Password must be 8+ chars with uppercase, lowercase, number, and special character'),
    body('role').optional().isIn(['user', 'investor', 'entrepreneur']).withMessage('Invalid role')
];

// Login validation
const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
];

// OTP validation
const otpValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be 6 digits')
];

// Password reset validation
const passwordResetValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be 6 digits'),
    body('newPassword').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage('Password must be 8+ chars with uppercase, lowercase, number, and special character')
];

// Routes
router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/verify-email', otpValidation, validateRequest, authController.verifyEmail);
router.post('/verify-login', otpValidation, validateRequest, authController.verifyLogin);
router.post('/forgot-password', [body('email').isEmail().normalizeEmail()], validateRequest, authController.forgotPassword);
router.post('/reset-password', passwordResetValidation, validateRequest, authController.resetPassword);

export default router;