/**
 * Custom Utilities
 */

// Dependencies
const fs = require('fs');
const path = require('path');
const Club = require('../models/Club');

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

function createDirectories() {
    const DIRECTORIES = ['.data/otp'];
    DIRECTORIES.forEach((dir) => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
}

/**
 * @description Runs a set of function when the application is initialized.
 */
const initializeApp = async () => {
    try {
        createClubDocument();
        createDirectories();
        // eslint-disable-next-line no-console
        console.log('✨ App Initialized!\n\n');
        // eslint-disable-next-line no-empty
    } catch (_) { }
};

module.exports = { ApiError, initializeApp };
