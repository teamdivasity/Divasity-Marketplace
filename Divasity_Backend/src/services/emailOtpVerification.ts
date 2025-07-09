import { sendEmail } from "../config/emailConfig";

export const emailOTPVerification = async (otp: string, receiver: string) => {
  try {
    const subject = "Verify your email";
    const text = `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`;
    const email = await sendEmail(receiver, subject, text);
    return email;
  } catch (error: any) {
    throw error;
  }
};
