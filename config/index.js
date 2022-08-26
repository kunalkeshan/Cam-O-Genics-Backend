/**
 * Application Configuration
 */

// Dependencies
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const CURRENT_DB = isProduction ? 'CamOGenics' : 'test';
const DB_URL = ``;

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