
import { server } from "./infrastructureLayer/services/Chat";
import connectDB from "./infrastructureLayer/webserver/config/db";
import { redisDB } from "./infrastructureLayer/webserver/config/redis";
require("dotenv").config();

const PORT = process.env.PORT || 3000;

export const redis = redisDB()

const start = () => {
  server.listen(PORT, () => {
    console.log(`server has been connected on http://localhost/${PORT}`);
    connectDB();
  });
};

start();
