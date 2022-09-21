/**
 * Express Error handling middleware
 */

// Dependencies
const { isProduction, GITHUB_URL } = require('../config');
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
    return res.status(500).json({
        ...(!isProduction && { error: err }),
        message: 'app/internal-server-error',
        data: {
            instruction: `Something went wrong, we're really sorry for the inconvenience.
            You can try again in sometime, or if the issue persists, head over to ${GITHUB_URL} and open up an issue!`,
        },
        success: false,
    });
};

// Exporting error handler
module.exports = errorHandler;
