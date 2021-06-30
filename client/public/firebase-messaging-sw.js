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
    var d = new Date();
    var now = d.getTime();
    const notificationTitle = payload.data.title;
    const docs = JSON.parse(payload.data.docs)

    console.log(docs.timeCreated)
    console.log(now)
    console.log(now - docs.timeCreated)

    if (now - docs.timeCreated > 3600000 * 12)
        return null

    var tag = docs.center.address + docs.session.min_age_limit.toString() + docs.session.vaccine.toString()

    const notificationOptions = {
        body: payload.data.body,
        icon: new URL('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/syringe_1f489.png'),
        timestamp: docs.timeCreated,
        vibrate: [300, 100, 400],
        tag: tag
    };
    console.log(notificationOptions)

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    let url = 'https://selfregistration.cowin.gov.in/';
    //event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});