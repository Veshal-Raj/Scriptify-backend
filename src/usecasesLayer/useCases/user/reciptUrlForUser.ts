import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const reciptUrlForUser = async (
    userId: string,
    next: Next,
    userRepository: IUserRepository,
    logger: ILogger
) => {
    try {
        const response = await userRepository.reciptUrl(userId)
        return response
        
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}