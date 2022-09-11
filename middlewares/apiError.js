/**
 * Express Error handling middleware
 */

// Dependencies
const { isProduction } = require('../config');
const { ApiError } = require('../utils/custom');

/**
 * @description Express error handling middleware
 */
const errorHandler = (err, req, res) => {
    if (!isProduction) console.log(err);
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
        data: {},
        success: false,
    });
};

// Exporting error handler
module.exports = errorHandler;
