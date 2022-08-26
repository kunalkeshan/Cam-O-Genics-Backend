/**
 * Custom Utilities
 */

// Dependencies

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

module.exports = { ApiError }