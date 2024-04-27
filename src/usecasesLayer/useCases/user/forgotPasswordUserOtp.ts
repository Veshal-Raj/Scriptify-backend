
import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const forgotPasswordUserOtp = async (
    otp: string,
    email: string,
    next: Next,
    userRepository: IUserRepository,
    logger: Ilogger
) => {
    try {
        
        const response = await userRepository.forgotPasswordUserOtp(otp, email)
        return response
        
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}