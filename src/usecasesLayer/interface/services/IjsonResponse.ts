import IUser from "../../../entitiesLayer/user";

export interface IJsonResponse {
    user?: IUser;
    status: number;
    success: boolean;
    message: string
}