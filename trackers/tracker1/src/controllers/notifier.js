import { sendNotificationToClient } from '../notify.js';

export const notifier = (data, message, center, session) => {
    const tokens = [data.deviceToken];
    var d = new Date();
    var n = d.getTime();

    var docs = {
        center: center,
        session: session,
        timeCreated: n
    }

    const notificationData = {
        title: 'Vaccine Available',
        body: message,
        docs: JSON.stringify(docs)
    };

    sendNotificationToClient(tokens, notificationData);
}