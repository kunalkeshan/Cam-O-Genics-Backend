/**
 * Audit Model
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Audit Schema
const AuditSchema = new Schema({
    for: {
        type: String,
        enum: ['LOGIN', 'LOGOUT', 'SIGNUP', 'CREATE', 'UPDATE', 'DELETE', 'ISE', 'REQUEST'], // ISE - Internal Server Error
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Events',
    },
    notificationId: {
        type: Schema.Types.ObjectId,
        ref: 'Notifications',
    },
    message: String,
    data: Map,
}, {
    timestamps: { createdAt: true, updatedAt: false },
    expires: '30 days',
});

// Audit Model
const Audit = model('Audit', AuditSchema);

// Exporting Audit
module.exports = Audit;
