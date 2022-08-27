/**
 * Application Configuration
 */

// Dependencies
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DB_URL = !isProduction ? process.env.DB_URL_DEV : process.env.DB_URL_PROD;

const APP_REGEX = {
    COLLEGE_EMAIL: /^(([a-z]{2}[0-9]{4})(@srmist\.edu\.in))$/,
    COGID: /^(COG)[0-9]{6}$/,
    PASSWORD: /^[a-zA-z0-9]{6,}$/,
    RAMAPURAM_ENGINEERING_REGISTER_NO: '',
    FORGOT_PASSWORD_OTP_FORMAT: /^[0-9]{4,}$/,
}

// Configuration Container
const configuration = {
    isProduction,
    PORT: process.env.PORT,
    DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_REGEX,
    MAIL_CONFIG: {
        email: process.env.MAIL_EMAIL,
        password: process.env.MAIL_PASSWORD,
    }
};

// Exporting Configuration
module.exports = configuration;