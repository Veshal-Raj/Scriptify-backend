import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const googleAuth = async (
    uid: string,
    next: Next,
    userRepository: IUserRepository,
    logger: ILogger
) => {
    try {
        const result = await userRepository.googleAuth(uid)
        return result
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}