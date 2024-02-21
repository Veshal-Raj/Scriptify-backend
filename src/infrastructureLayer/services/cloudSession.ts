import IUser from "../../entitiesLayer/user";
import { IcloudSession } from "../../usecasesLayer/interface/services/IcloudSession";
import { redis } from "../..";
import { IJsonResponse } from "../../usecasesLayer/interface/services/IjsonResponse";


export class CloudSession implements IcloudSession {

    async createUserSession(id: string, user: IUser): Promise<string> {
        const result = await redis.set(id, JSON.stringify(user))
        return result
    }

    async clearUserSession(id: string): Promise<number> {
        const result = await redis.del(id)
        return result
    }

    async getUser(id: string): Promise<string | IJsonResponse> {
        const user = await redis.get(id);
        if (!user) return { status: 400, success: false, message: "session has expired"}
        else return user
    }
}