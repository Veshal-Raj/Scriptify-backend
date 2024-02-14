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
    name: string,
    password: string | Promise<string>,
    next: Next
): Promise<string | void | never> =>{
    try {
        // check user exist
        const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);
        if (isUserExistOnUserRepo) {
            return next(new ErrorHandler(400, "user already exist with the same mail id"))
        }

        // check user present in otp repo
        let isUserOnOtpRepo = await otpRepository.findUser(email)
        if (isUserOnOtpRepo) {
            await sendMail.sendEmailVerification(name, email, isUserOnOtpRepo.otp as string)

            const hashPassword = await bcrypt.createHash(password as string);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                personal_info: {
                    fullname: name, // Assign name to fullname
                    email: email,
                    password: password as string,
                },
            })
            return jwtToken
        } else {
            const otp = await otpGenerator.generateOTP();
            await otpRepository.createOtpUserCollection({ email, otp })
            await sendMail.sendEmailVerification(name, email, otp);

            const hashPassword = await bcrypt.createHash(password as string);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                personal_info: {
                    fullname: name, // Assign name to fullname
                    email: email,
                    password: password as string,
                },
            })
            return jwtToken;
        }
    
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
    }
}

