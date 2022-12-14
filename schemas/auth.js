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
    cogcId: Joi.string().required().regex(APP_REGEX.COGID, 'i'),
    email: Joi.string().email().required().regex(APP_REGEX.COLLEGE_EMAIL),
    password: Joi.string().required().regex(APP_REGEX.PASSWORD),
});

AuthSchema.signupCommunityMemberSchema = Joi.object({
    fullName: Joi.string().required(),
    registerNo: Joi.string().regex(APP_REGEX.RAMAPURAM_ENGINEERING_REGISTER_NO).required(),
    password: Joi.string().required().regex(APP_REGEX.PASSWORD),
    email: Joi.string().email().required().regex(APP_REGEX.COLLEGE_EMAIL),
});

AuthSchema.loginUserSchema = Joi.object({
    user: Joi.alternatives([Joi.string(), Joi.string().regex(APP_REGEX.COGID, 'i'), Joi.string().email().regex(APP_REGEX.COLLEGE_EMAIL)]).required(),
    password: Joi.string().required(),
});

AuthSchema.forgotPasswordSchema = Joi.object({
    user: Joi.alternatives([Joi.string(), Joi.string().regex(APP_REGEX.COGID, 'i'), Joi.string().email().regex(APP_REGEX.COLLEGE_EMAIL)]).required(),
});

AuthSchema.verifyOtpSchema = Joi.object({
    id: Joi.string().hex().length(24).required(), // mongodb id
    otp: Joi.string().regex(APP_REGEX.FORGOT_PASSWORD_OTP_FORMAT).required(),
});

AuthSchema.resetPasswordSchema = Joi.object({
    token: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
    password: Joi.string().regex(APP_REGEX.PASSWORD).required(),
});

AuthSchema.AuthRoleSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    role: Joi.string().required(),
    assign: Joi.boolean().required(),
});

// Exporting Schema
module.exports = AuthSchema;
