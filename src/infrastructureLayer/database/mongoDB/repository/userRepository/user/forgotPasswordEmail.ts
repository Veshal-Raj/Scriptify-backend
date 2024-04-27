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
    const existingUser = await UserModel.findOne({
      "personal_info.email": email,
    });

    const existingOTP = await OtpModel.findOne({ email });

    if (existingOTP) return { message: "Otp already send!" };

    if (existingUser && !existingOTP) {
      const username = existingUser.personal_info.username;
      const otp = await otpGenerator.generateOTP();

      await sendMail.sendEmailVerification(username, email, otp);

      await OtpModel.create({ email, otp });

      return { message: "OTP send successfully" };
    } else {
      return { message: "Email does not exist" };
    }
  } catch (error) {
    throw error;
  }
};
