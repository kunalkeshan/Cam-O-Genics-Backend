/**
 * Events Mailer
 */

// Dependencies
const path = require('path');
const { mjml2HTMLParser } = require('@wavychat/mjml-parser');
const transporter = require('./setup');
const { MAIL_CONFIG } = require('../config');

const TEMPLATES_PATH = {
    NEW_EVENT: path.join(__dirname, 'mjml/events', 'new-event.mjml'),
    UPDATE_EVENT: path.join(__dirname, 'mjml/events', 'update-event.mjml'),
    DELETE_EVENT: path.join(__dirname, 'mjml/events', 'delete-event.mjml'),
};

// Events Mailer Container
const eventMailer = {};

eventMailer.sendNewEventEmail = async ({ emailList, event }) => {
    const html = await mjml2HTMLParser({
        mjml: {
            path: TEMPLATES_PATH.NEW_EVENT,
        },
        template: {
            engine: 'handlebars',
            vars: { ...event },
        },
    });
    return new Promise((resolve) => {
        const mailOptions = {
            to: MAIL_CONFIG.email,
            bcc: emailList,
            subject: '',
            html,
        };
        // TODO: Logging for email errors required
        transporter.sendMail(mailOptions, (error, info) => {
            if (error && !info) { return resolve(error); }
            return resolve('New event email sent!');
        });
    });
};

module.exports = eventMailer;
