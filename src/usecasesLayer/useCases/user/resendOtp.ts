import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/IotpRepository";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IcreateOTP } from "../../interface/services/IcreateOTP";
import { ILogger } from "../../interface/services/IerrorLog";
import { IJwt } from "../../interface/services/Ijwt.types";
import { ISendMail } from "../../interface/services/IsendMail";
import { ErrorHandler } from "../../middlewares/errorHandler";




export const resendOtp = async (
    token: string,
    next: Next,
    otpRepository: IOtpRepository,

    userrepository: IUserRepository,
    jwtVerifier: IJwt,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    logger: ILogger
) => {
    try {
        let decode = (await jwtVerifier.verifyJwt(token)) as IUser;
        console.log('decode --->> ', decode)

        if (!decode) {
            return next(new ErrorHandler(400, "token has been expired. register again", logger))
        }

        const email = decode.personal_info.email
        console.log('email --->>>>> ', email)

        const checkUser = await otpRepository.findUser(email)

        if (checkUser) {
            const result = await otpRepository.findUserAndDelete(email)
            console.log('result --- (findUserAndDelete) ---> ', result)
        }

        const response = await userrepository.resendOtp(email, sendMail, otpGenerator)
        return response

    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}