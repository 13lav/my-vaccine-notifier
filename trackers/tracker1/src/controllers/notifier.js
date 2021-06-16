import { sendNotificationToClient } from '../notify.js';

export const notifier = (data, message) => {
    const tokens = [data.deviceToken];
    const notificationData = {
        title: 'Vaccine Available',
        body: message,
    };
    sendNotificationToClient(tokens, notificationData);
}