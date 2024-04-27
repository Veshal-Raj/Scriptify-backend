

import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const initialBlogComment = async (
    blogId: string,
    next: Next,
    userRepository: IUserRepository,
    logger: Ilogger
) => {
    try {
       console.log('reached inside the latestBlog usecase engine ')
       const response = await userRepository.initialComments(blogId)
       return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}
