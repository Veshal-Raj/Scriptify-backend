import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const getUserSubscribedData = async (
    next: Next,
    adminRepository: IAdminRepository,
    logger: Ilogger
) => {
    try {
        return await adminRepository.getUserSubscribedData()
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
    }
}