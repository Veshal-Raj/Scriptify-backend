import IUser from "../../../entitiesLayer/user";



export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
}