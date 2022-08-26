/**
 * Auth Schemas
 */

// Dependencies
const Joi = require('joi');
const { APP_REGEX } = require('../config');

// Auth Schema Container
const AuthSchema = {};

AuthSchema.signupClubMemberSchema = Joi.object({
    fullName: Joi.string().required(),
    cogcId: Joi.string().required().regex(APP_REGEX.COGID),
    email: Joi.string().email().required().regex(APP_REGEX.COLLEGE_EMAIL),
    password: Joi.string().required().regex(APP_REGEX.PASSWORD),
});

AuthSchema.loginUserSchema = Joi.object({
    user: Joi.alternatives([Joi.string(), Joi.string().email()]).required(),
    password: Joi.string().required(),
});

// Exporting Schema
module.exports = AuthSchema;