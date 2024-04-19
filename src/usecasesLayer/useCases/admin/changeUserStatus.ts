import { Next, Ilogger, Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IUserResponse } from "../../interface/request_response/user";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const changeUserStatus = async (
    adminRepository: IAdminRepository,
    req: Req,
    next: Next,
    logger: Ilogger
) : Promise<IUserResponse | void> => {
   try {
    console.log(req.params.id , 'in usercases/admin/changeuserstatus')
        return await adminRepository.changeUserStatus(req.params.id as string)
   } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
   }
}