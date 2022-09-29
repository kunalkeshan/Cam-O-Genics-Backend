/**
 * App Mailer
 */

// Dependencies
const path = require('path');
const { mjml2HTMLParser } = require('@wavychat/mjml-parser');
const { format } = require('date-fns');
const transporter = require('./setup');
// const { MAIL_CONFIG } = require('../config');

const TEMPLATES_PATH = {
    ISE_MAIL: path.join(__dirname, 'mjml/app', 'ise-mail.mjml'),
};

// App Mailer Container
const appMailer = {};

appMailer.sendIseMail = async ({ appError }) => {
    const date = format(new Date(), 'PPP');
    const html = await mjml2HTMLParser({
        mjml: {
            path: TEMPLATES_PATH.ISE_MAIL,
        },
        template: {
            engine: 'handlebars',
            vars: { appError, date },
        },
    });
    return new Promise((resolve) => {
        const mailOptions = {
            to: 'kk1738@srmist.edu.in',
            subject: 'Application faced Internal Server Error!',
            html,
        };
        // TODO: Logging for email errors required
        transporter.sendMail(mailOptions, (error, info) => {
            if (error && !info) { return resolve(error); }
            return resolve('Club member signup mail sent!');
        });
    });
};

module.exports = appMailer;
