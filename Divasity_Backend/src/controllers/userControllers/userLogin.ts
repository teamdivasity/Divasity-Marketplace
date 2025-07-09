import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../../models/User";
import { verifyPassword } from "../../services/password";
import { generateToken } from "../../services/token";

export const userLogin = async (request:Request, response:Response, next:NextFunction):Promise<any> => {
    try {
        const { email, password } = request.body;

        // Validate user exists by email
        const user = await User.findOne({ where: { email } });

        // Handle invalid email
        if (!user) {
            console.log('User not found for email:', email);
            return response.status(400).json({ error: true, message: "Invalid email" });
        }

        // Log user data to debug
        console.log('User found:', user.toJSON());

        // Validate provided password with the stored hashed password
        const validatepassword = await verifyPassword(password, user.password);

        // Handle incorrect password
        if (!validatepassword) {
            console.log('Password validation failed for email:', email);
            return response.status(400).json({
                error: true,
                message: "Incorrect Password"
            });
        }

        // Check if user is verified
        if (!user.IsVerified) {
            console.log('User not verified for email:', email);
            return response.status(403).json({
                error: true,
                message: "Account not verified. Please verify your account to log in."
            });
        }

        // Prepare user info for token
        const userInfo = {
            id: user.id,
            email: user.email,
            telephone: user.telephone,
            role: user.role
        };

        // Prepare user data for response
        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        const token = generateToken(userInfo);

        return response.status(200).json({
            error: false,
            message: "User login successful",
            data: userData,
            token
        });

    } catch (error: any) {
        console.error('Login error:', error.message);
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            errorMessage: error.message
        });
    }
};