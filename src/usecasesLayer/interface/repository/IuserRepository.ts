import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
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
    latestBlog(page: number,next: Next ): Promise<any>
    trendingBlogs(next: Next): Promise<any>
    fetchTags(next: Next): Promise<any>
    filterByTag(tag: string, next:Next): Promise<any>
    searchByQueries(query: string, next: Next): Promise<any>
    getProfile(userId: string, next: Next): Promise<any>
    fetchUserBlogs(userId: string, next: Next): Promise<any>
    fetchSingleBlog(blog_id: string, next: Next): Promise<any>
    fetchSimilarBlogs(tags: string[], next: Next): Promise<any>
    increaseReadCount(userId: string, blogId: string, next: Next): Promise<any>
    followUser(authorId: string, userId: string, next: Next): Promise<any>
    unfollowUser(authorId: string, userId: string, next: Next): Promise<any>
    likeBlog(blogId: string, userId: string, next: Next): Promise<any>
    unLikeBlog(blogId: string, userId: string, next: Next): Promise<any>
    intialLike(userId: string, blogId: string, next: Next): Promise<any>
    saveBlog(blogId: string, userId: string, next: Next): Promise<any>
}