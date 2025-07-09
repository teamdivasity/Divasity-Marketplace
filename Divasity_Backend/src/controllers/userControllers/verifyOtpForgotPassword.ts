import { Request, Response } from "express";
import { User } from "../../models/User";
import { Otp } from "../../models/Otp";
import { hashPassword } from "../../services/password"; 

export const verifyResetPasswordOtpWithNewPassword = async (
  request: Request,
  response: Response
) => {
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
    const otpRecord = await Otp.findOne({
      where: {  otp_code: otp },
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
    const user = await User.findByPk(otpRecord.user_id);
    if (!user) {
       response.status(404).json({
        error: true,
        message: "User not found.",
      });
        return;
    }

    // Update user's password
    user.password = await hashPassword(new_password);
    await user.save();

    // Remove all OTPs related to the user
    await Otp.destroy({ where: { user_id: user.id } });

     response.status(200).json({
      error: false,
      message: "Password has been successfully updated.",
    });
  } catch (error: any) {
     response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
