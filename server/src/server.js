import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { config } from './config/config.js';
import bodyParser from 'body-parser';

import locationRoutes from './routers/location.js';
import centerRoutes from './routers/center.js';
import userRoutes from './routers/user.js';
import tracker from './utils/tracker.js';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//app.use('/api', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/centers', centerRoutes);

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

    tracker(60);

    app.listen(config.PORT, () => {
        console.log(`Server has started on port ${config.PORT}...`);
    });
}