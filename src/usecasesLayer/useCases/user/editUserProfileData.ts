import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const editUserProfileData = async (
    personal_info: any,
    social_links: any,
    uploaded_image: string,
    userId: string,
    next: Next,
    userRepository: IUserRepository,
    logger: ILogger
) => {
    try {
        const response = await userRepository.editUserProfile(personal_info, social_links, uploaded_image, userId)
        return response
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}