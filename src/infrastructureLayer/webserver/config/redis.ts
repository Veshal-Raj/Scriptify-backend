import { Redis } from "ioredis";
import dotenv from 'dotenv'

dotenv.config()

const getRedisUrl = () => {
    const redis = process.env.REDIS_URL as string
    if (redis) {
        return redis
    }
    throw new Error("REDIS_URL not defined")
}

export const redis = new Redis(getRedisUrl())