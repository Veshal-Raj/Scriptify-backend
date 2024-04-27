import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IHashpassword } from "../../interface/services/IhashPassword";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const changePassword = async(
    userId: string,
    newPassword: string,
    next: Next,
    bcrypt: IHashpassword,
    userRepository: IUserRepository,
    logger: Ilogger
) => {
    try {
        newPassword = await bcrypt.createHash(newPassword as string)
        const response = await userRepository.changePassword(userId, newPassword)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}