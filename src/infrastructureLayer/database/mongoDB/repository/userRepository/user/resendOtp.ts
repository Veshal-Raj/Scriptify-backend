import { IcreateOTP } from "../../../../../../usecasesLayer/interface/services/IcreateOTP"
import { ISendMail } from "../../../../../../usecasesLayer/interface/services/IsendMail"
import OtpModel from "../../../models/otpModel";
import UserModel from "../../../models/userModel";



export const resendOtp = async (
    email: string,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP
) => {
    try {
        console.log('email ----- ', email)
        // const existingUser = await UserModel.findOne({ 'personal_info.email': email });
        // console.log('existing user --- ', existingUser)
        
        const existingOTP = await OtpModel.findOne({ email });
        console.log('existingOTP --- ', existingOTP)

    if (existingOTP) return { message: 'Otp already send!'}

    if ( !existingOTP) {

        const otp = await otpGenerator.generateOTP() 
        console.log('otp --- ', otp)
        console.log('email --- ',email)
        const mail = await sendMail.sendEmailVerification('User',email, otp)
        console.log('mail --- ', mail)
        
        const otpDoc =   await OtpModel.create({ email, otp });
        console.log(otpDoc)

      console.log('Email already exists:', email);
      return { message: "OTP send successfully"}
    } else {
      // Email doesn't exist, handle accordingly (e.g., send error message)
      console.log('Email does not exist:', email);
      return { message: 'Email does not exist'}
    }
        
    } catch (error) {
        throw error
    }
}