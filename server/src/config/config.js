// config.js
import env from 'dotenv';
env.config();
export const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    CLIENT_URL: process.env.CLIENT_URL,
};