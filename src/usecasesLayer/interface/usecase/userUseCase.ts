import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";

export interface IUserUseCase {
  // saving user details temporary
  registerUser(
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    next: Next
  ): Promise<string | void | never>;

  // create user in db
  createUser(
    verificationCode: string,
    token: string,
    next: Next
  ): Promise<IUser | void | never>
}
