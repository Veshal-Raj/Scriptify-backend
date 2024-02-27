import IUser from "../../../entitiesLayer/user";

export interface IUserResponse {
    success: boolean,
    message: string,
    data?: IUser | IUser[] | null
}