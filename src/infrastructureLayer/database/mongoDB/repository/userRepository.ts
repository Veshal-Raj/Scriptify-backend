import UserModel from "../models/userModel";
import IUser from "../../../../entitiesLayer/user";
import { IUserRepository } from "../../../../usecasesLayer/interface/repository/IuserRepository";


import { createUser, findUserByEmail } from "./userRepository/user";
import { getAllUser } from "./userRepository/admin";



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
}