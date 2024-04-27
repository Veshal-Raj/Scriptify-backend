// import IUser from "../../../entitiesLayer/user";
import IUser from "../../../entitiesLayer/user";
import { Next, Ilogger, Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import { IUserResponse } from "../../interface/request_response/user";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const changeUserStatus = async (
    adminRepository: IAdminRepository,
    userId: string,
    next: Next,
    logger: Ilogger
) : Promise<IUserResponse  | IUser |  null |  void> => {
   try {
        return await adminRepository.changeUserStatus(userId)
   } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
   }
}