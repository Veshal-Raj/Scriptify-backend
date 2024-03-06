import { IBlog } from "../../../entitiesLayer/blog";
import IUser from "../../../entitiesLayer/user";
import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
// import IBlogrepo
import { ErrorHandler } from "../../middlewares/errorHandler";


export const userCreateBlog = async (
    userRepository: IUserRepository,
     title:string,
      des: string, 
      banner: string, 
      content: any, 
      tags: string[],
       author: string, 
       blog_id: string, 
       draft: boolean, 
    //    next: Next, 
       logger: Ilogger
): Promise<any>=>{
    try {
        console.log('reached inside the createBlog in user in usecaselayer', title, des, banner, content, tags, author, blog_id, draft, logger)
    //    const result = await userCreateBlog(title, des, banner, content, tags, author, blog_id, draft, logger )
       
    //    console.log('result in useCaselayer createBlog --> ', result)
    const result = await userRepository.userCreateBlog(title, des, banner, content, tags, author, blog_id, draft)
       return result
    } catch (error: unknown | never) {
        throw error
    }
}

