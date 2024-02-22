import IUser from "../../entitiesLayer/user";
import { IcloudSession } from "../../usecasesLayer/interface/services/IcloudSession";
import { redis } from "../..";
import { IJsonResponse } from "../../usecasesLayer/interface/services/IjsonResponse";


export class CloudSession implements IcloudSession {
    
    async createUserSession(id: string, user: IUser): Promise<string> {
        try {
            console.log('id in createUserSession -->>> ', id, user)
            const result = await redis.set(id, JSON.stringify(user))
            return result
            
        } catch (error) {
            throw error
        }
    }

    async clearUserSession(id: string): Promise<number> {
        try {
            const result = await redis.del(id)
            return result
            
        } catch (error) {
            throw error
        }
    }

    async getUser(id: string): Promise<string | IJsonResponse> {
        try {
            const user = await redis.get(id);
            if (!user) return { status: 400, success: false, message: "session has expired"}
            else return user
            
        } catch (error) {
            throw error
        }
    }
}