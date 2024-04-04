import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const checkUserSubscribed = async (
    userId: string,
    next: Next,
    userRepository: IUserRepository,
    logger: ILogger
) => {
    try {
        console.log('reached inside the usecase engine')
        console.log(userId)
        const response = await userRepository.checkIsSubscribed(userId, next)
        console.log(response)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}