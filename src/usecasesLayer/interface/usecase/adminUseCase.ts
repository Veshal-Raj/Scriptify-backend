import IUser from "../../../entitiesLayer/user";
import { Next, Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserResponse } from "../request_response/user";


export interface IAdminUseCase {
    getAllUser(next: Next): Promise<IUser[] | void>
    changeUserStatus(req: Req, next: Next): Promise<IUserResponse | void>
    getAllBlogs(next: Next): Promise<any>
    changeBlogStatus(blogId: string, next: Next): Promise<any>
    getAllReports(next: Next): Promise<any>
}