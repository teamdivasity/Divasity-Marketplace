import express from "express";
import { resendOtp, userRegister, verifyOtp } from "../controllers/userControllers/userRegister";
import {userLogin } from "../controllers/userControllers/userLogin";
import { forgotPassword } from "../controllers/userControllers/forgotPassword";
import { verifyResetPasswordOtpWithNewPassword } from "../controllers/userControllers/verifyOtpForgotPassword";
import { getAllUsers, getUserById } from "../controllers/userControllers/userController";
import { updateUser } from "../controllers/userControllers/updateUser";


const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/verifyotp", verifyOtp)
userRoutes.post("/resendOtp", resendOtp)
userRoutes.post("/login", userLogin);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/verify-otp", verifyResetPasswordOtpWithNewPassword);
userRoutes.get("/getuser", getAllUsers)
userRoutes.get("/getuser/:id", getUserById)
userRoutes.patch("/update/:id", updateUser)


export default userRoutes;