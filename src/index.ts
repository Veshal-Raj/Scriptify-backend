import { app } from "./infrastructureLayer/webserver/config/app";
import connectDB from "./infrastructureLayer/webserver/config/db";
require('dotenv').config()

const PORT = process.env.PORT || 3000

const start = () => {
    app.listen(PORT, () => {
        console.log(`server has been connected on http://localhost/${PORT}`)
    connectDB()
    })
}

start()