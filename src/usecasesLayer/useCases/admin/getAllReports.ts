import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";




export const getAllReports = async (
    next: Next,
    adminRepository: IAdminRepository,
    logger: Ilogger
) => {
    try {
            const result = await adminRepository.getAllReports()
            return result
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
   }
}