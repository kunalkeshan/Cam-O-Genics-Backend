/**
 * Event Model
 */

// Dependencies
const {Schema, model} = require('mongoose');

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
    managers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    mode: {
        type: String,
        enum: ['ONLINE', 'OFFLINE'],
        required: true,
        
    },
    location: String,
    link: String,
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
    skipVersioning: true,
});

// Event Model
const Event = model('Event', EventSchema);

// Exporting Event
module.exports = Event;