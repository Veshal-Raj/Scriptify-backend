import UserModel from "../models/userModel";
import IUser from "../../../../entitiesLayer/user";
import { IUserRepository } from "../../../../usecasesLayer/interface/repository/IuserRepository";
import BlogModel from "../models/blogModel";


import { CreateBlog, createUser, findUserByEmail } from "./userRepository/user";
import { getAllUser } from "./userRepository/admin";
import { IUserResponse } from "../../../../usecasesLayer/interface/request_response/user";
import { changeUserStatus } from "./userRepository/admin/changeUserStatus";
import { NextFunction } from "express";
import { latestBlogs } from "./userRepository/user/latestBlogs";



export class UserRepository implements IUserRepository {
    constructor(private userModels: typeof UserModel, private blogModels: typeof BlogModel) {}

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

    // create blog
    async userCreateBlog(title: string, des: string, banner: string, content: any, tags: string[], authorId: string, blog_id: string, draft: boolean): Promise<any> {
        console.log('reached inside userRepository')
        const result = await CreateBlog(title, des, banner, content, tags, authorId, blog_id, draft, this.userModels, BlogModel)
        console.log('result from userRepository -->> ', result)
        return result
    }

    // get blogs
    async latestBlog(next: NextFunction): Promise<any> {
        console.log('reached inside userRepository')
        const result = await latestBlogs(this.blogModels, this.userModels)
        console.log('got the result in userrepository-->> ')
        return result
    }
    
}