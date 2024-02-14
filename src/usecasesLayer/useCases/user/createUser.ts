import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/IotpRepository";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IJwt } from "../../interface/services/Ijwt.types";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const createUser = async (
    userRepository: IUserRepository,
    otpRepository: IOtpRepository,
    jwtVerifier: IJwt,
    otpFromUser: string,
    token: string,
    next: Next
)=>{
    try {
        let decode = (await jwtVerifier.verifyJwt(token)) as IUser;
        if (!decode) {
            return next(new ErrorHandler(400, "token has been expired, register again"))
        }
        // check whether use exists
        const email = decode.personal_info.email
        const checkUser = await otpRepository.findUserWithOTP(email, otpFromUser)

        if (!checkUser) return next(new ErrorHandler(400, 'OTP mismatch'))
        let otp = checkUser.otp
        
        if(otpFromUser === otp) {

            decode.isVerified = true;
            const newUser = await userRepository.createUser(decode);
            newUser.personal_info.password = ''
            return newUser;            
        } 

    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
    }
}

