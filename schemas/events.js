/**
 * Events Schemas
 */

// Dependencies
const Joi = require('joi');

// Events Schema Container
const EventsSchema = {};

EventsSchema.newEventSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    mode: Joi.string().valid('ONLINE', 'OFFLINE').required(),
    location: Joi.string(),
    link: Joi.string(),
    cover: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    sendEmails: Joi.boolean().required(),
});

// Exporting Schema
module.exports = EventsSchema;
