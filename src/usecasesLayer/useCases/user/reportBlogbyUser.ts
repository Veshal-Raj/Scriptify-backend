import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const reportBlogbyUser = async (
    blog_id: string,
    reason: string,
    reportedBy: string,
    next: Next,
    userRepository: IUserRepository,
    logger: Ilogger
)=> {
    try {
        console.log('reached inside the usecase engine')
        const response = await userRepository.reportBlog(blog_id, reason, reportedBy,next)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}