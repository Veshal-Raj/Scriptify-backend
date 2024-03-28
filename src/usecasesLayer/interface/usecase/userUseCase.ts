import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IToken } from "../services/Ijwt.types";

export interface IUserUseCase {
  // saving user details temporary
  registerUser(
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    next: Next
  ): Promise<string | void | never>;

  // create user in db
  createUser(
    verificationCode: string,
    token: string,
    next: Next
  ): Promise<IUser | void | { message: string }>;

  login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<{ user: IUser; tokens: IToken } | void>;

  generateUploadURL(next: Next): Promise< any | void>

  createBlog(
    title: string,
    des: string,
    banner: string,
    content: any, 
    tags: string[],
    author: string,
    blog_id: string,
    draft: boolean,
    next: Next
  ): Promise<any>;

  latestBlog(page: number, next: Next): Promise< any | void>

  trendingBlog(next: Next): Promise<any | void>

  exploreTags(next: Next): Promise<any | void>

  filterByTags(tag: string, next: Next): Promise<any | void>

  searchByQuery(query: string, next: Next): Promise<any | void>

  getProfile(userId: string, next: Next): Promise<any | void>

  fetchUserBlogs(userId: string, next: Next): Promise<any | void>

  fetchSingleBlog(blog_id: string, next: Next): Promise<any | void>

  fetchSimilarBlogs(tags: string[], next: Next): Promise<any | void>

  increaseReadCount(userId: string, blogId: string, next: Next): Promise<any | void>

  followUser(authorId: string, userId: string, next: Next): Promise<any | void>

  unfollowUser(authorId: string, userId: string, next: Next): Promise<any | void>

  likeBlog(blogId: string, userId: string, next: Next): Promise<any | void>

  unLikeBlog(blogId: string, userId: string, next: Next): Promise<any | void>

  initialLike(userId: string, blogId: string, next: Next): Promise<any | void>

  saveBlog(blogId: string, userId: string, next: Next): Promise<any | void>

  unSaveBlog(blogId: string, userId: string, next: Next): Promise<any | void>

  savedBlogs(userId: string, next: Next): Promise<any | void>

  listFollowers(userId: string, next: Next): Promise<any | void>
}
