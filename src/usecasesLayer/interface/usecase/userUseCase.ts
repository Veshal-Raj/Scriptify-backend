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

  latestBlog(next: Next): Promise< any | void>

  trendingBlog(next: Next): Promise<any | void>
}
