/**
 * Audit Model
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Audit Schema
const AuditSchema = new Schema({
    actionType: {
        type: String,
        enum: ['LOGIN', 'LOGOUT', 'SIGNUP'],
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false },
});

// Audit Model
const Audit = model('Audit', AuditSchema);

// Exporting Audit
module.exports = Audit;
