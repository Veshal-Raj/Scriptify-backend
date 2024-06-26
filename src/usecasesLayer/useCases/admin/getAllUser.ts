import { Next, Ilogger } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const getAllUser = async (adminRepository: IAdminRepository, next: Next, logger: Ilogger) => {
    try {
        return await adminRepository.getAllUser('user')
    } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
    }
}