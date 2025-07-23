import { Request, Response } from "express";
import { User, Notification } from '../../models';
import { v4 } from "uuid";
import { hashPassword } from '../../services/password';
import { generateOTP } from "../../services/generateOtp";
import Otp from "../../models/Otp";
import { expiryTime } from "../../services/expiryTime";
import { emailOTPVerification } from "../../services/emailOtpVerification";

export const userRegister = async (request: Request, response: Response):Promise<any> => {
  try {
    const { email, firstName, lastName, password, address, userName, role, telephone } = request.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return response.status(400).json({
        error: true,
        message: `${email} already exists`,
      });
    }

    // Check if the phone number already exists
    const existingPhone = await User.findOne({ where: { telephone } });
    if (existingPhone) {
      return response.status(400).json({
        error: true,
        message: `${telephone} already exists`,
      });
    }

    // Generate UUID and hash password
    const id = v4();
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
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

    const emailOTP = String(generateOTP());

    await Otp.create({
      id: v4(),
      user_id: id,
      otp_code: emailOTP,
      otp_expiry: expiryTime(10),
    });

    await emailOTPVerification(emailOTP, email);

    return response.status(200).json({
      error: false,
      message: "Registration successful, OTP sent to email",
    });
  } catch (error: any) {
    return response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

export const verifyOtp = async (request: Request, response: Response):Promise<any> => {
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
    const user = await User.findOne({ where: { email } });
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
    const otpRecord = await Otp.findOne({
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
    await user.update({ IsVerified: true });

    // Optionally delete OTP record
    await otpRecord.destroy();

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
  } catch (error: any) {
    return response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

export const resendOtp = async (request: Request, response: Response):Promise<any> => {
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
    const user = await User.findOne({ where: { email } });
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
    await Otp.destroy({ where: { user_id: user.id } });

    // Generate and save new OTP
    const emailOTP = String(generateOTP());
    await Otp.create({
      id: v4(),
      user_id: user.id,
      otp_code: emailOTP,
      otp_expiry: expiryTime(10),
    });

    // Send OTP via email
    await emailOTPVerification(emailOTP, email);

    return response.status(200).json({
      error: false,
      message: "New OTP sent to email",
    });
  } catch (error: any) {
    return response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};