/**
 * Application Configuration
 */

// Dependencies
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const DB_URL = ''

// Configuration Container
const configuration = {
    isProduction,
    PORT: process.env.PORT,
    DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};

// Exporting Configuration
module.exports = configuration;