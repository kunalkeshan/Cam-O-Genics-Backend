/**
 * Event Model
 */

// Dependencies
const {Schema, model} = require('mongoose');

// Event Schema
const EventSchema = new Schema({});

// Event Model
const Event = model('Event', EventSchema);

// Exporting Event
module.exports = Event;