import { Redis } from "ioredis";
require("dotenv").config()

export function redisDB(){
    const redisClient = () => {
        if (process.env.REDIS_URL){
            console.log('Redis has been connected')
            return process.env.REDIS_URL
        }
        throw new Error ("Redis connection failed")
    }

    const redis = new Redis(redisClient())
    return redis
}