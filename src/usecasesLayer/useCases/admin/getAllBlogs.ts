import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes"
import { ErrorHandler } from "../../middlewares/errorHandler"
import { IAdminRepository } from "../../interface/repository/IadminRepository";





export const getAllBlogs = async (
    next: Next,
    adminRepository: IAdminRepository,
    logger: Ilogger
) => {
    try {
        const result = adminRepository.getAllBlogs()
        return result
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
   }
}