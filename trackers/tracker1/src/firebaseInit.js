import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import admin from 'firebase-admin';
import { config } from './config/config.js';

const serviceAccount = require(config.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.DB_URL
});

export const messaging = admin.messaging();