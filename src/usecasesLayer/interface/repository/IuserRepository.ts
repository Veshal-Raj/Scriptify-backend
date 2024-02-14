import IUser from "../../../entitiesLayer/user";
import { IJsonResponse } from "../services/IjsonResponse";


export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
}