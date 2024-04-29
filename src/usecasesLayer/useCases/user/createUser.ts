import IUser from "../../../entitiesLayer/user";
import { CloudSession } from "../../../infrastructureLayer/services/cloudSession";
import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/IotpRepository";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IJwt } from "../../interface/services/Ijwt.types";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const createUser = async (
    userRepository: IUserRepository,
    otpRepository: IOtpRepository,
    jwtVerifier: IJwt,
    cloudSession: CloudSession,
    otpFromUser: string,
    token: string,
    next: Next,
    logger:Ilogger
)=>{
    try {
        let decode = (await jwtVerifier.verifyJwt(token)) as IUser;
       
        if (!decode) return next(new ErrorHandler(400, "token has been expired, register again",logger))

        // check whether use exists
        const email = decode.personal_info.email
        console.log('email --->>>>> ', email)
        const checkUser = await otpRepository.findUserWithOTP(email, otpFromUser)
        console.log('checkUser ----->>>>>> ', checkUser)

        if (!checkUser) {
        //    return next(new ErrorHandler(500,  'OTP  mismatch', logger));
        return {status: 404,  message: 'OTP mismatch'};
    }
        let otp = checkUser.otp
        
        if(otpFromUser === otp) {

            decode.isVerified = true;
            const checkUserExistInUserRepo = await userRepository.findUserByEmail(email)
            console.log('check user exist in user repo ----->>>>> ', checkUserExistInUserRepo)
            if(checkUserExistInUserRepo)  {

                next(new ErrorHandler(401,  'User already exists', logger)) 
                return {message: 'user already exists'};
        };
            const newUser = await userRepository.createUser(decode);
            console.log('new user  --- ', newUser)
            newUser.personal_info.password = '' // no need of sending password

            const a = await cloudSession.createUserSession(newUser._id as string, newUser)

            console.log(' ---- a ---- ', a)

            return newUser;            
        } else return next( new ErrorHandler(401, "OTP mismatch", logger))

    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}

