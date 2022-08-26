/**
 * Mailer Utility
 */

// Dependencies
const nodemailer = require('nodemailer');
const authMailer = require('./auth');
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

// Mail Utility Container
const mailUtil = {};

mailUtil.auth = authMailer;

// Export Util
module.exports = { mailUtil, transporter };
