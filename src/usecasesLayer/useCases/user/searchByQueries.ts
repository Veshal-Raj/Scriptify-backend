import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const searchByQueries = async (
    // blogRepository:
    query: string,
    userRepository: IUserRepository,
    next: Next,
    logger: ILogger
) => {
    try {
       console.log('reached inside the latestBlog usecase engine ')
       const response = await userRepository.searchByQueries(query, next)
       return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}
