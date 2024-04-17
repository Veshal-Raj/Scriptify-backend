import { IcreateOTP } from "../../../../../../usecasesLayer/interface/services/IcreateOTP";
import { ISendMail } from "../../../../../../usecasesLayer/interface/services/IsendMail";
import OtpModel from "../../../models/otpModel";
import UserModel from "../../../models/userModel";

export const forgotPasswordEmail = async (
  email: string,
  otpGenerator: IcreateOTP,
  sendMail: ISendMail
) => {
  try {
    const existingUser = await UserModel.findOne({ 'personal_info.email': email });

    const existingOTP = await OtpModel.findOne({ email });

    if (existingOTP) return { message: 'Otp already send!'}

    if (existingUser && !existingOTP) {
        const username = existingUser.personal_info.username
        const otp = await otpGenerator.generateOTP() 
        console.log('otp --- ', otp)
        console.log('email --- ',email)
        const mail = await sendMail.sendEmailVerification(username,email, otp)
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
    throw error;
  }
};
