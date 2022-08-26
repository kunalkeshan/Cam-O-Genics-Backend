/**
 * Custom Utilities
 */

// Dependencies
const Club = require("../models/Club");

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
};

/**
 * @description Runs a set of function when the application is initialized.
 */
const initializeApp = async () => {
    try {
        // Create A single Club Document
        const ClubDocCount = await Club.countDocuments();
        if(ClubDocCount === 0) await Club.create({});
        console.log('✨ App Initialized!\n\n')
    } catch (_) {}
}

module.exports = { ApiError, initializeApp }