/**
 * Application Configuration
 */

// Dependencies
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DB_URL = isProduction ? process.env.DB_URL_DEV : process.env.DB_URL_PROD;

// Configuration Container
const configuration = {
    isProduction,
    PORT: process.env.PORT,
    DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_CONFIG: {
        email: process.env.MAIL_EMAIL,
        password: process.env.MAIL_PASSWORD,
    }
};

// Exporting Configuration
module.exports = configuration;