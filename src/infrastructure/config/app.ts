import express from "express";
import router from "../route/userRoute";

export const createServer = () => {
    try {
        const app = express()
        app.use(express.json())
        app.use(router)
        return app
    } catch (error) {
        console.error(error);
        
    }
}
