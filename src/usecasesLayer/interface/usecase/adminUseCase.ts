import IUser from "../../../entitiesLayer/user";
import { Next, Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserResponse } from "../request_response/user";


export interface IAdminUseCase {
    getAllUser(next: Next): Promise<IUser[] | void>
    changeUserStatus(req: Req, next: Next): Promise<IUserResponse | void>
}