import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const trendingBlogs = async (
    // blogRepository:
    userRepository: IUserRepository,
    next: Next,
    logger: ILogger
) => {
    try {
       console.log('reached inside the latestBlog usecase engine ')
       const response = await userRepository.trendingBlogs(next)
       return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}