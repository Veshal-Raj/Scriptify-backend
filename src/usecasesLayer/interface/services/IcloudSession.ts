import IUser from "../../../entitiesLayer/user";
import { IJsonResponse } from "./IjsonResponse";

export interface IcloudSession {
    createUserSession(id: string, user: IUser): Promise<string>;
    clearUserSession(id: string): Promise<number>;
    getUser(id: string): Promise<string | IJsonResponse>;
}