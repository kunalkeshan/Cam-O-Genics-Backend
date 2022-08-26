/**
 * Auth Schemas
 */

// Dependencies
const Joi = require('joi');

// Auth Schema Container
const AuthSchema = {};

AuthSchema.loginUserSchema = Joi.object({
    user: Joi.alternatives([Joi.string(), Joi.string().email()]).required(),
    password: Joi.string().required(),
});

// Exporting Schema
module.exports = AuthSchema;