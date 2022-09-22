/* eslint-disable func-names */
/**
 * Event Model
 */

// Dependencies
const { Schema, model } = require('mongoose');
const { format } = require('date-fns');

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
    location: String,
    link: String,
    cover: String,
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
    event.createdAt = format(new Date(event.createdAt), 'PPP');
    event.updatedAt = format(new Date(event.updatedAt), 'PPP');
    return event;
};

// Event Model
const Event = model('Event', EventSchema);

// Exporting Event
module.exports = Event;
