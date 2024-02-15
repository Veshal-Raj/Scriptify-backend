import { IOtp } from "../../../entitiesLayer/otp";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/IotpRepository";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IcreateOTP } from "../../interface/services/IcreateOTP";
import { IHashpassword } from "../../interface/services/IhashPassword";
import { IJwt } from "../../interface/services/Ijwt.types";
import { ISendMail } from "../../interface/services/sendMail";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const registerUser = async (
  otpRepository: IOtpRepository,
  userRepository: IUserRepository,
  sendMail: ISendMail,
  otpGenerator: IcreateOTP,
  jwtTokenGenerator: IJwt,
  bcrypt: IHashpassword,
  email: string,
  fullname: string,
  password: string | Promise<string>,
  next: Next
): Promise<string | void | never> => {
  try {
    // check user exist
    console.log(
      "reached insdie the register user in usercases/user/registeruser"
    );

    const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);

    if (isUserExistOnUserRepo)
      return next(
        new ErrorHandler(400, "user already exist with the same mail id")
      );

    let isUserOnOtpRepo: IOtp | null = (await otpRepository.findUser(
      email
    )) as IOtp | null;

    if (isUserOnOtpRepo == null) {
      // generate otp
      const otp = await otpGenerator.generateOTP();

      // send mail
      await sendMail.sendEmailVerification(fullname, email, otp);

      const hashPassword = await bcrypt.createHash(password as string);
      password = hashPassword;

      const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        personal_info: {
          fullname,
          email: email,
          password: password as string,
        },
      });

      // store data in otp repo
      if (jwtToken) await otpRepository.createOtpUserCollection({ email, otp });

      return jwtToken;
    } else {
      // generate otp
      const otp = await otpGenerator.generateOTP();

      // find old doc and delete
        await otpRepository.findUserAndDelete(email)

      // send mail
      await sendMail.sendEmailVerification(fullname, email, otp);

      const hashPassword = await bcrypt.createHash(password as string);
      password = hashPassword;
      const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        personal_info: {
          fullname,
          email: email,
          password: password as string,
        },
      });
      
      // store data in otp repo
      if (jwtToken) await otpRepository.createOtpUserCollection({ email, otp });

      return jwtToken;
    }
  } catch (error: unknown | never) {
    return next(
      new ErrorHandler(
        500,
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
};
