import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";




export const fetchUserNotification = async (
    userId: string,
    userRepository: IUserRepository,
    next: Next,
    logger: ILogger
) => {
    try {
        const response = await userRepository.fetchUserNotification(userId)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}