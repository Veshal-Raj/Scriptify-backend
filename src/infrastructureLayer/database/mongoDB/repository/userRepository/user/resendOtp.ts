import { IcreateOTP } from "../../../../../../usecasesLayer/interface/services/IcreateOTP";
import { ISendMail } from "../../../../../../usecasesLayer/interface/services/IsendMail";
import OtpModel from "../../../models/otpModel";

export const resendOtp = async (
  email: string,
  sendMail: ISendMail,
  otpGenerator: IcreateOTP
) => {
  try {
    const existingOTP = await OtpModel.findOne({ email });

    if (existingOTP) return { message: "Otp already send!" };

    if (!existingOTP) {
      const otp = await otpGenerator.generateOTP();

      const mail = await sendMail.sendEmailVerification("User", email, otp);

      const otpDoc = await OtpModel.create({ email, otp });

      return { message: "OTP send successfully" };
    } else {
      // Email doesn't exist, handle accordingly (e.g., send error message)
      console.log("Email does not exist:", email);
      return { message: "Email does not exist" };
    }
  } catch (error) {
    throw error;
  }
};
