import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IcreateOTP } from "../../interface/services/IcreateOTP";
import { ILogger } from "../../interface/services/IerrorLog";
import { ISendMail } from "../../interface/services/IsendMail";
import { ErrorHandler } from "../../middlewares/errorHandler";




export const forgotPasswordEmail = async (
    email: string,
    next: Next,
    userrepository: IUserRepository,
    otpGenerator: IcreateOTP,
    sendMail: ISendMail,
    logger: ILogger
) => {
    try {
        const response = await userrepository.forgotPasswordEmail(email, otpGenerator, sendMail)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}