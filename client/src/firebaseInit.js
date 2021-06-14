import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyACKhgOVvY1yPL3LHC_biFoTKsms-k5thw",
    authDomain: "cowin-nearby-test.firebaseapp.com",
    projectId: "cowin-nearby-test",
    storageBucket: "cowin-nearby-test.appspot.com",
    messagingSenderId: "622923549677",
    appId: "1:622923549677:web:023dd3bb3cd8136e4935e4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// next block of code goes here
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