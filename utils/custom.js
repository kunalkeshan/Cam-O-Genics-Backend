/**
 * Custom Utilities
 */

// Dependencies
const fs = require('fs');
const path = require('path');
const open = require('open');
const Club = require('../models/Club');
const { PORT, isProduction } = require('../config');

/**
 * @description ApiError class, returns error object with custom config
 * @returns {object} error object
 * @example
 * const error = new ApiError({message: 'User with email already exists', status: 409, data: {email: 'john.doe@example.com'}})
 */
class ApiError extends Error {
    constructor({ message = '', statusCode = 500, data = {} }) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}

async function createClubDocument() {
    // Create A single Club Document
    const ClubDocCount = await Club.countDocuments();
    if (ClubDocCount === 0) await Club.create({});
}

async function createDirectories() {
    const DIRECTORIES = ['.data/otp'];
    DIRECTORIES.forEach((dir) => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
}

async function openAppInBrowser() {
    if (!isProduction) {
        return open(`http://localhost:${PORT}`, { app: { name: open.apps.chrome } });
    }
    return Promise.resolve();
}

/**
 * @description Runs a set of function when the application is initialized.
 */
const initializeApp = async () => {
    try {
        await createClubDocument();
        await createDirectories();
        await openAppInBrowser();
        // eslint-disable-next-line no-console
        console.log('✨ App Initialized!\n\n');
        // eslint-disable-next-line no-empty
    } catch (_) { }
};

module.exports = { ApiError, initializeApp };
