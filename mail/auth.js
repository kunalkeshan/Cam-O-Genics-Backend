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
    PASSWORD_CHANGED: path.join(__dirname, 'mjml/auth', 'password-changed.mjml'),
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
            if (error && !info) { return resolve(error); }
            return resolve('Club member signup mail sent!');
        });
    });
};

authMailer.sendCommunityMemberSignup = async () => { };

authMailer.sendForgotPassword = async ({ officialEmail, fullName, otp }) => {
    const html = await mjml2HTMLParser({
        mjml: {
            path: TEMPLATES_PATH.FORGOT_PASSWORD,
        },
        template: {
            engine: 'handlebars',
            vars: { fullName, otp },
        },
    });
    return new Promise((resolve) => {
        const mailOptions = {
            to: officialEmail,
            subject: 'Enter OTP to Change Password | CamOGenics',
            html,
        };
        // TODO: Logging for email errors required
        transporter.sendMail(mailOptions, (error, info) => {
            if (error && !info) { return resolve(error); }
            return resolve('Forgot password with otp mail sent!');
        });
    });
};

authMailer.sendPasswordChanged = async ({ officialEmail, fullName }) => {
    const html = await mjml2HTMLParser({
        mjml: {
            path: TEMPLATES_PATH.PASSWORD_CHANGED,
        },
        template: {
            engine: 'handlebars',
            vars: { fullName },
        },
    });
    return new Promise((resolve) => {
        const mailOptions = {
            to: officialEmail,
            subject: 'Password Changed Successfully | CamOGenics',
            html,
        };
        // TODO: Logging for email errors required
        transporter.sendMail(mailOptions, (error, info) => {
            if (error && !info) { return resolve(error); }
            return resolve('Password changed successfully mail sent!');
        });
    });
};

// Export mailer
module.exports = authMailer;
