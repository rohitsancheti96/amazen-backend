const dotenv = require("dotenv");

dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};
