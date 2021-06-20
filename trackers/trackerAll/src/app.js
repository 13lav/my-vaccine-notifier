import mongoose from 'mongoose';
import { config } from './config/config.js';
import tracker from './tracker.js';
import { sendNotificationToClient } from './notify.js';

const connect = async (url) => {
    await mongoose.connect(
        url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    ).then(() => {
        console.log('Database Connected...');
    }).catch(err => {
        console.error(err);
    });
}

export const start = async () => {
    await connect(config.DB_URL);
    tracker(240);
}
