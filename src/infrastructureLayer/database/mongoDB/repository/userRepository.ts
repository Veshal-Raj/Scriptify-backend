import userModel from "../models/userModel";

import {IUserRepository} from '../../../../usecasesLayer/interface/repository/userRepository'
import {IUser} from '../../../../entitiesLayer/user'

import {createUser, findUserByEmail} from './user/index'

export class UserRepository implements IUserRepository{
    constructor(private userModels:typeof userModel) {}

    async findUserByEmail(email: string): Promise<{ userExist: boolean; }> {
        console.log('checking whether a user with the email is exist or not')
        const userExist = await findUserByEmail(email, this.userModels)
        console.log('userExist --> ', userExist)
        if (userExist.existingUser) {
            return {userExist: true}
        } else {
            return {userExist: false}
        }
    }

 async createUser(newUser: IUser): Promise<{ user?: IUser; id?: number; success: boolean; message: string; status: number}> {
        console.log('inside user repository')
        return createUser(newUser, this.userModels)
    }
}