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
): Promise<string | void | never> =>{
    try {
        // check user exist
        const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);
        console.log('check user exist --> ',isUserExistOnUserRepo)
        if (isUserExistOnUserRepo) {
            return next(new ErrorHandler(400, "user already exist with the same mail id"))
        }
        console.log('user detail --> ', email, fullname, password )
        // check user present in otp repo
        let isUserOnOtpRepo = await otpRepository.findUser(email)
        console.log('check user present in otp repo--> ', isUserExistOnUserRepo)
        if (isUserOnOtpRepo) {
            await sendMail.sendEmailVerification(fullname, email, isUserOnOtpRepo.otp as string)

            const hashPassword = await bcrypt.createHash(password as string);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                personal_info: {
                    fullname, 
                    email: email,
                    password: password as string,
                },
            })
            return jwtToken
        } else {
            const otp = await otpGenerator.generateOTP();
            await otpRepository.createOtpUserCollection({ email, otp })
            await sendMail.sendEmailVerification(fullname, email, otp);

            const hashPassword = await bcrypt.createHash(password as string);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                personal_info: {
                    fullname, 
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

