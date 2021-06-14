// config.js
import env from 'dotenv';
env.config();
export const config = {
    DB_URL: process.env.DB_URL,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
};