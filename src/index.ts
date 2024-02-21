import { app } from "./infrastructureLayer/webserver/config/app";
import connectDB from "./infrastructureLayer/webserver/config/db";
import { redisDB } from "./infrastructureLayer/webserver/config/redis";
require("dotenv").config();

const PORT = process.env.PORT || 3000;

export const redis = redisDB()

const start = () => {
  app.listen(PORT, () => {
    console.log(`server has been connected on http://localhost/${PORT}`);
    connectDB();
  });
};

start();
