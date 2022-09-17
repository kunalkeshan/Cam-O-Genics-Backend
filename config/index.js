/**
 * Application Configuration
 */

// Dependencies
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DB_URL = !isProduction ? process.env.DB_URL_DEV : process.env.DB_URL_PROD;

/*
    RA(Year)2(Discipline)2(Course)4(Campus)2(Roll no)3
    RA2011004010051
    RA20110320 2  0  0  1  8
    0123456789 10 11 12 13 14
 */

const APP_REGEX = {
    COLLEGE_EMAIL: /^(([a-z]{2}[0-9]{4})(@srmist\.edu\.in))$/,
    COGID: /^(COG)[0-9]{6}$/,
    PASSWORD: /^[\w@./#&+-]{6,}$/,
    RAMAPURAM_ENGINEERING_REGISTER_NO: /^RA([0-9]{2})11([0-9]{4})20([0-9]{3})$/,
    FORGOT_PASSWORD_OTP_FORMAT: /^[0-9]{4,}$/,
};

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
    },
    AUTH_ROLES: ['ADMIN', 'PRESIDENT', 'SECRETARY', 'ALUMNI', 'MEMBER'],
};

// Exporting Configuration
module.exports = configuration;
