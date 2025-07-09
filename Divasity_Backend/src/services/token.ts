import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const appSecret = process.env.JWT_SECRET as string;

export interface TokenPayload {
  [key: string]: any;
}

interface VerifyResult {
  valid: boolean;
  decoded?: TokenPayload;
  error?: string;
}

export const generateToken = (data: TokenPayload): string => {
  return jwt.sign(data, appSecret, { expiresIn: "24h" });
};

export const verifyToken = (token: string): VerifyResult => {
  try {
    const decoded = jwt.verify(token, appSecret) as TokenPayload;
    return { valid: true, decoded };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
};