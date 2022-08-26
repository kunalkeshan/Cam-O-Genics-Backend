/**
 * Auth Mailer
 */

// Dependencies
const transporter = require('./setup');
const fs = require('fs');
const path = require('path');

const TEMPLATES_PATH = {
    CLUB_MEMBER_SIGNUP: path.join(__dirname, 'templates/auth', 'club-member-signup.html'),
    COMMUNITY_MEMBER_SIGNUP: path.join(__dirname, 'templates/auth', 'community-member-signup.html'),
    FORGOT_PASSWORD: path.join(__dirname, 'templates/auth', 'forgot-password.html'),
}

// Auth Mailer Container
const authMailer = {};

authMailer.sendClubMemberSignup = async ({ name, email }) => {
    return new Promise((resolve, reject) => {
        fs.readFile(TEMPLATES_PATH.CLUB_MEMBER_SIGNUP, (err, html) => {
            if (err && !html) return reject(err);
            html.replace('{ NAME }', name);

            const mailOptions = {
                to: email,
                subject: 'Welcome to the Cam O Genics Community!'
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error && !info) return resolve(error);
                return resolve('Club member signup mail sent!')
            })
        });
    });
};

authMailer.sendCommunityMemberSignup = async () => { };

authMailer.sendForgotPassword = async () => { };

// Export mailer
module.exports = authMailer;