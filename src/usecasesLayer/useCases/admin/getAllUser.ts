import { Next, Ilogger } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const getAllUser = async (userRepository: IUserRepository, next: Next, logger: Ilogger) => {
    try {
        return await userRepository.getAllUser('user')
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
    }
}