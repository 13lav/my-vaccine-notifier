import express from 'express';
//import cors from 'cors';
import mongoose from 'mongoose';

import { config } from './config/config.js';
import bodyParser from 'body-parser';

import locationRoutes from './routers/location';

const app = express();
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//app.use('/api', authRoutes);
app.use('/api/location', locationRoutes);

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

    app.listen(config.PORT, () => {
        console.log(`Server has started on port ${config.PORT}...`);
    });
}