import { messaging } from './firebaseInit.js';

export const sendNotificationToClient = (tokens, data) => {
    // Send a message to the devices corresponding to the provided
    // registration tokens.
    const android = {
        ttl: 300000,
        notification: {
            click_action: "OPEN_ACTIVITY_1"
        },
        //collapseKey: "myvaccinenotifier",
        tag: "myvaccinenotifier"
    }

    const message = {
        tokens: tokens,
        notification: data,
        android: android,
        webpush: {

        }
    }

    messaging
        .sendMulticast({ tokens, data })
        .then(response => {
            // Response is an object of the form { responses: [] }
            const successes = response.responses.filter(r => r.success === true)
                .length;
            const failures = response.responses.filter(r => r.success === false)
                .length;
            console.log(
                'Notifications sent:',
                `${successes} successful, ${failures} failed`
            );
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });
};