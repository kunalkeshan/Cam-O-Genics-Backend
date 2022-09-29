/* eslint-disable func-names */
/**
 * Event Model
 */

// Dependencies
const { Schema, model } = require('mongoose');
const { format } = require('date-fns');
const ics = require('ics');
const { MAIL_CONFIG } = require('../config');

// Event Schema
const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lastUpdatedBy: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        time: {
            type: Date,
            default: Date.now,
        },
    }],
    mode: {
        type: String,
        enum: ['ONLINE', 'OFFLINE'],
        required: true,
    },
    meetLink: String,
    website: String,
    cover: String,
    locationName: { type: String, default: 'SRM Ramapuram' },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [13.032267552501912, 80.1807374965776],
        },
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
    skipVersioning: true,
    strict: true,
});

// Methods and Statics

EventSchema.methods.sanitize = async function () {
    await this.populate('createdBy lastUpdatedBy.user', 'fullName officialEmail defaultAvatar avatar id');
    const event = this.toJSON();

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const createdDate = new Date(event.createdAt);

    const startDateArray = [startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes()];
    const endDateArray = [endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes()];
    const createdDateArray = [createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate(), createdDate.getHours(), createdDate.getMinutes()];

    const ical = {
        // timezone: 'Asia/Calcutta',
        start: startDateArray,
        end: endDateArray,
        // allDay: true,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        created: createdDateArray,
        title: event.title,
        description: event.description,
        location: event.locationName,
        geo: {
            lat: event.location.coordinates[0],
            lon: event.location.coordinates[1],
        },
        organizer: { name: 'CamOGenics Community', email: MAIL_CONFIG.email },
    };

    event.ical = ics.createEvent(ical).value;

    event.createdAt = format(new Date(event.createdAt), 'PPP');
    event.updatedAt = format(new Date(event.updatedAt), 'PPP');
    return event;
};

// Event Model
const Event = model('Event', EventSchema);

// Exporting Event
module.exports = Event;
