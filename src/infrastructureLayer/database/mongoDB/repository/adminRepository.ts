import IUser from "../../../../entitiesLayer/user";
import { IAdminRepository } from "../../../../usecasesLayer/interface/repository/IadminRepository";
import { IUserResponse } from "../../../../usecasesLayer/interface/request_response/user";
import { getAllUser } from "./userRepository/admin";
import { changeBlogStatus } from "./userRepository/admin/changeBlogStatus";
import { changeUserStatus } from "./userRepository/admin/changeUserStatus";
import { getAllBlogs } from "./userRepository/admin/getAllBlogs";
import { getAllReports } from "./userRepository/admin/getAllReports";







export class AdminRepository implements IAdminRepository {
    constructor() {}

    async getAllUser(role: string): Promise<IUser[]> {
        const data = await getAllUser(role)
        console.log(data)
        return data
    }


    async changeUserStatus(id: string): Promise<IUserResponse | null | IUser> {
        console.log(id, 'in repository')
        const data = await changeUserStatus(id)
        return data
    }

    async getAllBlogs(): Promise<any> {
        const result = await getAllBlogs()
        return result
    }

    async changeBlogStatus(blogId: string): Promise<any> {
        const result = await changeBlogStatus(blogId)
        return result
    }

    async getAllReports(): Promise<any> {
        const result = await getAllReports()
        return result
    }
}