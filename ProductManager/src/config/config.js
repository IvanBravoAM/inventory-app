import dotenv from "dotenv";

dotenv.config();

export default {
    persistence: process.env.PERSISTENCE,
    GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL : process.env.GITHUB_CALLBACK_URL,
    MONGO_URL : process.env.MONGO_URL,
    PORT : process.env.PORT || 8080,
    HOST_NAME : process.env.HOST_NAME
};