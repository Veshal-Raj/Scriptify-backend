import IUser from "../../../entitiesLayer/user";
import { IUserResponse } from "../request_response/user";



export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(role: string): Promise<IUser []>;
    changeUserStatus(id: string): Promise<IUserResponse | null | IUser>
    userCreateBlog(
        title: string,
        des: string,
        banner: string,
        content: any, // Adjust the type according to your content structure
        tags: string[],
        authorId: string, // Assuming authorId is a string representing the ID of the author
        blog_id: string,
        draft: boolean
    ): Promise<any>;
}