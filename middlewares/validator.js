/**
 * Schema Validator 
 */

// Dependencies
const Joi = require('joi');
const { ApiError } = require('../utils/custom');

const validateSchema = (validateFor = 'body', schema) => (req, res, next) => {
    try {
        const { error } = schema.validate(req[validateFor]);
        if (!error) return next();
        else throw new ApiError({ message: 'app/request-validation-error', error: {...error.details[0]}, statusCode: 422 });
    } catch (error) {
        return next(error);
    }
}

module.exports = validateSchema;