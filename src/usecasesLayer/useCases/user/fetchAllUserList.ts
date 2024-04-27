import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const fetchAllUserList = async (
    next:Next,
    userRepository: IUserRepository,
    logger: Ilogger
) => {
    try {
        const result = await userRepository.fetchAllUsers()
        return result
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
} 