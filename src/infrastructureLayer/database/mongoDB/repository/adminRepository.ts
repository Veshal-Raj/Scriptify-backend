import IUser from "../../../../entitiesLayer/user";
import { IAdminRepository } from "../../../../usecasesLayer/interface/repository/IadminRepository";
import { IUserResponse } from "../../../../usecasesLayer/interface/request_response/user";
import { changeBlogStatus, changeUserStatus, getAllBlogs, getAllReports, getAllUser, getTotalBlogData, getUserSubscribedData } from "./userRepository/admin/root";







export class AdminRepository implements IAdminRepository {
    constructor() {}

    async getAllUser(role: string): Promise<IUser[]> {
        return await getAllUser(role)
    }


    async changeUserStatus(userId: string): Promise<IUserResponse | null | IUser> {
        return await changeUserStatus(userId)
    }

    async getAllBlogs(): Promise<any> {
        return await getAllBlogs()
    }

    async changeBlogStatus(blogId: string): Promise<any> {
        return await changeBlogStatus(blogId)
    }

    async getAllReports(): Promise<any> {
        return await getAllReports()
    }

    async getUserSubscribedData(): Promise<any> {
        return await getUserSubscribedData()
    }

    async getTotalBlogData(): Promise<any> {
        return await getTotalBlogData()
    }
}