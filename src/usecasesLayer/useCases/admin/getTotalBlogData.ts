import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes"
import { IAdminRepository } from "../../interface/repository/IadminRepository"
import { ErrorHandler } from "../../middlewares/errorHandler"



export const getTotalBlogData = async (
    next: Next,
    adminRepository: IAdminRepository,
    logger: Ilogger
) => {
    try {
        return await adminRepository.getTotalBlogData()
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
    }
} 