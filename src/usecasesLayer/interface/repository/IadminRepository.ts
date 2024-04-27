import IUser from "../../../entitiesLayer/user";
import { IUserResponse } from "../request_response/user";





export interface IAdminRepository {
    getAllUser(role: string): Promise<IUser []>;
    changeUserStatus(userId: string): Promise<IUserResponse | null | IUser | void>
    getAllBlogs(): Promise<any>
    changeBlogStatus(blogId: string): Promise<any>
    getAllReports(): Promise<any>
}