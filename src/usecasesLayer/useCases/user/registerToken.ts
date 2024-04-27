import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const registerToken = async (
    token: string,
    userId: string,
    userRepository: IUserRepository,
    next: Next,
    logger: Ilogger
) => {
    try {
        const response = await userRepository.registerUserToken(token, userId)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}