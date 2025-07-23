import { Request, Response } from "express";
import { User, Notification } from '../../models';
import { Otp } from "../../models/Otp";
import { v4 as uuidv4 } from "uuid";
import { generateOTP } from "../../services/generateOtp";
import { expiryTime } from "../../services/expiryTime";
import { emailOTPVerification } from "../../services/emailOtpVerification";


export const forgotPassword = async(request:Request, response:Response) =>{

    const {email} = request.body;

    if (!email){
        response.status(400).json({
            error:true,
            message: "Email is required"
        })
        return 
    }

    try {
            //check if email already exist

        const user = await User.findOne({where:{email}})

        if(!user){
            response.status(400).json({
                error:true,
                message: `${email} does not exist`
            })
            return 
        }

        //Generate OTP and Store int the database
        const OTP = String(generateOTP())

        const id = uuidv4();

        await Otp.create({
            id,
            user_id: user.id,
            otp_code: OTP,
            otp_expiry: expiryTime(10),
        })



        //Send OTP to the user email
        await emailOTPVerification(OTP, email)


        response.status(200).json({
            error:false,
            message: `OTP has been sent to ${email}`
        })

    } catch (error: any) {
        response.status(500).json({
            error:true,
            message: "Internal server error",
            errorMessage: error.message
        })
        return 
    }
}