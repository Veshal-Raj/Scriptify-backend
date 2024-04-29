import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const filteredByTag = async (
    // blogRepository:
    tag: string,
    userRepository: IUserRepository,
    next: Next,
    logger: Ilogger
) => {
    try {
       console.log('tag  ----- ',tag)
    //    const newTag = tag?.tag
       const response = await userRepository.filterByTag(tag)
       return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}
