/**
 * Auth Mailer
 */

// Dependencies
const path = require('path');
const { mjml2HTMLParser } = require('@wavychat/mjml-parser');
const transporter = require('./setup');

const TEMPLATES_PATH = {
    CLUB_MEMBER_SIGNUP: path.join(__dirname, 'mjml/auth', 'club-member-signup.mjml'),
    COMMUNITY_MEMBER_SIGNUP: path.join(__dirname, 'mjml/auth', 'community-member-signup.mjml'),
    FORGOT_PASSWORD: path.join(__dirname, 'mjml/auth', 'forgot-password.mjml'),
};

// Auth Mailer Container
const authMailer = {};

authMailer.sendClubMemberSignup = async ({ fullName, officialEmail }) => {
    const html = await mjml2HTMLParser({
        mjml: {
            path: TEMPLATES_PATH.CLUB_MEMBER_SIGNUP,
        },
        template: {
            engine: 'handlebars',
            vars: { fullName },
        },
    });
    return new Promise((resolve) => {
        const mailOptions = {
            to: officialEmail,
            subject: 'Welcome to the Cam O Genics Community!',
            html,
        };
        // TODO: Logging for email errors required
        transporter.sendMail(mailOptions, (error, info) => {
            if (error && !info) return resolve(error);
            return resolve('Club member signup mail sent!');
        });
    });
};

authMailer.sendCommunityMemberSignup = async () => { };

authMailer.sendForgotPassword = async () => { };

// Export mailer
module.exports = authMailer;
