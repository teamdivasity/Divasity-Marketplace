"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// Registration validation
const registerValidation = [
    (0, express_validator_1.body)('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),
    (0, express_validator_1.body)('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),
    (0, express_validator_1.body)('userName').trim().isLength({ min: 3, max: 30 }).isAlphanumeric().withMessage('Username must be 3-30 alphanumeric characters'),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage('Password must be 8+ chars with uppercase, lowercase, number, and special character'),
    (0, express_validator_1.body)('role').optional().isIn(['user', 'investor', 'entrepreneur']).withMessage('Invalid role')
];
// Login validation
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password required')
];
// OTP validation
const otpValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be 6 digits')
];
// Password reset validation
const passwordResetValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be 6 digits'),
    (0, express_validator_1.body)('newPassword').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage('Password must be 8+ chars with uppercase, lowercase, number, and special character')
];
// Routes
router.post('/register', registerValidation, validation_1.validateRequest, authController_1.authController.register);
router.post('/login', loginValidation, validation_1.validateRequest, authController_1.authController.login);
router.post('/verify-email', otpValidation, validation_1.validateRequest, authController_1.authController.verifyEmail);
router.post('/verify-login', otpValidation, validation_1.validateRequest, authController_1.authController.verifyLogin);
router.post('/forgot-password', [(0, express_validator_1.body)('email').isEmail().normalizeEmail()], validation_1.validateRequest, authController_1.authController.forgotPassword);
router.post('/reset-password', passwordResetValidation, validation_1.validateRequest, authController_1.authController.resetPassword);
exports.default = router;
