/**
 * Express Error handling middleware
 */

// Dependencies
const { isProduction, GITHUB_URL } = require('../config');
const Audit = require('../models/Audit');
const { ApiError } = require('../utils/custom');

/**
 * @description Express error handling middleware
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
            data: err.data,
            success: false,
        });
    }
    Audit.create({ for: 'ISE', data: err.toString() });
    return res.status(500).json({
        ...(!isProduction && { error: err }),
        message: 'app/internal-server-error',
        data: {
            instruction: `Something went wrong, we're really sorry for the inconvenience.
            Project maintainers have been updated and you can try again in sometime, or if the issue persists, 
            head over to ${GITHUB_URL} and open up an issue!`,
        },
        success: false,
    });
};

// Exporting error handler
module.exports = errorHandler;
