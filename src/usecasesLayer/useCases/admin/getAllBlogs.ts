import { Next } from "../../../infrastructureLayer/types/serverPackageTypes"
import { ErrorHandler } from "../../middlewares/errorHandler"
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { IAdminRepository } from "../../interface/repository/IadminRepository";





export const getAllBlogs = async (
    next: Next,
    adminRepository: IAdminRepository,
    logger: ILogger
) => {
    try {
        const result = adminRepository.getAllBlogs()
        return result
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
   }
}