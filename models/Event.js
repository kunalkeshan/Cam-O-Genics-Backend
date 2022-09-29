/* eslint-disable func-names */
/**
 * Event Model
 */

// Dependencies
const { Schema, model } = require('mongoose');
const { format } = require('date-fns');
const { ICalCalendar } = require('ical-generator');
const ics = require('ics');
const { getVtimezoneComponent } = require('@touch4it/ical-timezones');
const { MAIL_CONFIG } = require('../config');

const calendar = new ICalCalendar();
calendar.timezone({
    name: 'Asia/Calcutta',
    generator: getVtimezoneComponent,
});

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

    event.ical = calendar.createEvent({
        timezone: 'Asia/Calcutta',
        start: event.startDate,
        end: event.endDate,
        allDay: true,
        status: 'CONFIRMED',
        busystatus: 'BUSY',
        created: event.createdAt,
        summary: event.title,
        description: event.description,
        method: 'REQUEST',
        location: {
            title: event.locationName,
            geo: {
                lat: event.location.coordinates[0],
                lon: event.location.coordinates[1],
            },
        },
        organizer: { name: 'CamOGenics Community', email: MAIL_CONFIG.email },
    });

    event.ical = ics.createEvent(event.ical);
    console.log(event.ical);

    event.createdAt = format(new Date(event.createdAt), 'PPP');
    event.updatedAt = format(new Date(event.updatedAt), 'PPP');
    return event;
};

// Event Model
const Event = model('Event', EventSchema);

// Exporting Event
module.exports = Event;
