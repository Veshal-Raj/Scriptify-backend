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
        console.log('decode ----->>>> ', decode)
        if (!decode) {
            return next(new ErrorHandler(400, "token has been expired, register again"))
        }
        // check whether use exists
        const email = decode.personal_info.email
        console.log('email --->>>>> ', email)
        const checkUser = await otpRepository.findUserWithOTP(email, otpFromUser)
        console.log('checkUser ----->>>>>> ', checkUser)

        if (!checkUser) return null
        let otp = checkUser.otp
        
        if(otpFromUser === otp) {

            decode.isVerified = true;
            const checkUserExistInUserRepo = await userRepository.findUserByEmail(email)
            console.log('check user exist in user repo ----->>>>> ', checkUserExistInUserRepo)
            if(checkUserExistInUserRepo)  {
                next(new ErrorHandler(401,  'User already exists')) 
                return {message: 'user already exists'};
        };
            const newUser = await userRepository.createUser(decode);
            newUser.personal_info.password = '' // no need of sending password
            return newUser;            
        } 

    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
    }
}

