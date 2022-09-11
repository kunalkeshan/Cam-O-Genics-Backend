/**
 * User Schemas
 */

// Dependencies
const Joi = require('joi');

// User Schema Container
const UserSchema = {};

UserSchema.updateNameSchema = Joi.object({
    fullName: Joi.string().required(),
});

UserSchema.updatePhoneSchema = Joi.object({
    phone: Joi.string().required(),
});

UserSchema.updateAddressSchema = Joi.object({
    address: Joi.string().required(),
});

UserSchema.updatePasswordSchema = Joi.object({
    password: Joi.string().required(),
});

UserSchema.updateCommunityIdentities = Joi.object({
    communityIdentities: Joi.array().items(Joi.string()).required(),
});

// Exporting Schema
module.exports = UserSchema;
