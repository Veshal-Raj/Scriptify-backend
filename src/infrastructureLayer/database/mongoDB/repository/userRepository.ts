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
import { trendingBlog } from "./userRepository/user/trendingBlog";
import { fetchAllTags } from "./userRepository/user/fetchAllTags";
import { filteredByTag } from "./userRepository/user/filteredByTag";
import { searchByQuery } from "./userRepository/user/searchByQuery";
import { getUserProfile } from "./userRepository/user/getUserProfile";
import { fetchUserBlog } from "./userRepository/user/fetchUserBlog";



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

    // get latest blogs
    async latestBlog(page: number,next: NextFunction): Promise<any> {
        console.log('reached inside userRepository')
        
        const result = await latestBlogs(page,this.blogModels, this.userModels)
        console.log('got the result in userrepository-->> ')
        return result
    }

    // get trending blogs
    async trendingBlogs(next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await trendingBlog(this.blogModels, this.userModels)   
        return result
    }

    async fetchTags(next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await fetchAllTags(this.blogModels)
        return result
    }

    async filterByTag(tag: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await filteredByTag(tag, this.blogModels, this.userModels)
        return result
    }

    async searchByQueries(query: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await searchByQuery(query, this.blogModels) 
        return result  
    }

    async getProfile(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await getUserProfile(userId,this.userModels, next)
        return result
    }

    async fetchUserBlogs(userId: string, next: NextFunction): Promise<any> {
        console.log('reached inside the userRepository')
        const result = await fetchUserBlog(userId, this.userModels)
        return result
    }
    
}