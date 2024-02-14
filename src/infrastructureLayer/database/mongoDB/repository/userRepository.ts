import UserModel from "../models/userModel";
import IUser from "../../../../entitiesLayer/user";
import { IUserRepository } from "../../../../usecasesLayer/interface/repository/IuserRepository";


import { createUser, findUserByEmail } from "./userRepository/user";



export class UserRepository implements IUserRepository {
    constructor(private userModels: typeof UserModel) {}

    // find user by email
    async findUserByEmail(email: string): Promise<IUser | null> {
        const userExist = await findUserByEmail(email, this.userModels);
        return userExist
    }

    // create user
    async createUser(newUser: IUser): Promise<IUser> {
        return await createUser(newUser, this.userModels)
    }
}