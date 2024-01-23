import express from "express";
// import 

export const createServer = () => {
    try {
        const app = express()
        app.use(express.json())

        return app
    } catch (error) {
        console.error(error);
        
    }
}
