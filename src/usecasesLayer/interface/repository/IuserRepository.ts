import IUser from "../../../entitiesLayer/user";
import { IUserResponse } from "../request_response/user";



export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(role: string): Promise<IUser []>;
    changeUserStatus(id: string): Promise<IUserResponse | null | IUser>

}