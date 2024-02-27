import { Next, Ilogger, Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IUserResponse } from "../../interface/request_response/user";
import { ErrorHandler } from "../../middlewares/errorHandler";

export const changeUserStatus = async (
    userRepository: IUserRepository,
    req: Req,
    next: Next,
    logger: Ilogger
) : Promise<IUserResponse | void> => {
   try {
    console.log(req.params.id , 'in usercases/admin/changeuserstatus')
        return await userRepository.changeUserStatus(req.params.id as string)
   } catch (error) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", logger))
   }
}