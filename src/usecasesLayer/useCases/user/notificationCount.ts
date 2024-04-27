import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";




export const notificationCount = async (
    userId: string,
    next: Next,
    userRepository: IUserRepository,
    logger: Ilogger
) => {
    try {
        const response = await userRepository.notificationCount(userId)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}