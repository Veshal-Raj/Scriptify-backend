import UserModel from "../models/userModel";
import IUser from "../../../../entitiesLayer/user";
import { IUserRepository } from "../../../../usecasesLayer/interface/repository/IuserRepository";


import { createUser, findUserByEmail } from "./userRepository/user";
import { getAllUser } from "./userRepository/admin";
import { IUserResponse } from "../../../../usecasesLayer/interface/request_response/user";
import { changeUserStatus } from "./userRepository/admin/changeUserStatus";



export class UserRepository implements IUserRepository {
    constructor(private userModels: typeof UserModel) {}

    // find user by email
    async findUserByEmail(email: string): Promise<IUser | null> {
        console.log('email in repostory -->>> ', email)
        const userExist = await findUserByEmail(email, this.userModels);
        console.log('userExist --->>> ', userExist)
        return userExist
    }

    // create user
    async createUser(newUser: IUser): Promise<IUser> {
        return await createUser(newUser, this.userModels)
    }

    // get all users
    async getAllUser(role: string): Promise<IUser[]> {
        const data = await getAllUser(role)
        console.log(data)
        return data
    }

    // change user status
    async changeUserStatus(id: string): Promise<IUserResponse | null | IUser> {
        console.log(id, 'in repository')
        const data = await changeUserStatus(id)
        return data
    }
}