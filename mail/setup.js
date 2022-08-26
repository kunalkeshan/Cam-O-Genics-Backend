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
    }
});

// Export Util
module.exports = transporter;
