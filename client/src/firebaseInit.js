import firebase from 'firebase/app';
import 'firebase/messaging';
import { config } from './config/config.js';

var firebaseConfig = {
    apiKey: config.REACT_APP_API_KEY,
    authDomain: config.REACT_APP_AUTH_DOMAIN,
    projectId: config.REACT_APP_PROJECT_ID,
    storageBucket: config.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: config.REACT_APP_MESSAGING_SENDER_ID,
    appId: config.REACT_APP_APP_ID,
};

let messaging = null

if (firebase.messaging.isSupported()) {
    firebase.initializeApp(firebaseConfig)
    messaging = firebase.messaging()
} else {
    console.log('no-support :(')
}

export const requestFirebaseNotificationPermission = (setTokenFound) =>
    new Promise((resolve, reject) => {
        messaging
            .requestPermission()
            .then(() => messaging.getToken())
            .then((firebaseToken) => {
                setTokenFound(true)
                resolve(firebaseToken);
            })
            .catch((err) => {
                setTokenFound(setTokenFound)
                reject(err);
            });
    });

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });