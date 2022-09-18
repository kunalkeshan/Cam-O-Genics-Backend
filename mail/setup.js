/**
 * Mailer Utility
 */

// Dependencies
const nodemailer = require('nodemailer');
const { MAIL_CONFIG } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    priority: 'high',
    from: `CamOGenics Community ${MAIL_CONFIG.email}`,
    auth: {
        user: MAIL_CONFIG.email,
        pass: MAIL_CONFIG.password,
    },
});

transporter.on('error', (error) => {
    transporter.sendMail({
        to: MAIL_CONFIG.email,
        subject: 'Error while ending email!',
        html: `
        <p>Error while sending email</p>
        <p>Name: ${error.name}</p>
        <p>Message: ${error.message}</p>
    `,
    });
});

// Export Util
module.exports = transporter;
