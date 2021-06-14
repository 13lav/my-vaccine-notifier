importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

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

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/firebase-logo.png'
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', event => {
    console.log(event)
    return event;
});