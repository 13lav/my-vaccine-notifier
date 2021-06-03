import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const sendMail = (recipient, content) => {

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cowinnearby@gmail.com',
            pass: 'kqocoditzlouozip' // naturally, replace both with your real credentials or an application-specific password
        }
    });

    const message = {
        from: 'cowinnearby@gmail.com', // Sender address
        to: recipient,         // List of recipients
        subject: 'Your Vaccine is Available', // Subject line
        html: `<h5>${content}</h5>`
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.error(err);
            throw err;
        } else {
            console.log('Email Sent Successfully');
        }
    });

}

export default sendMail;