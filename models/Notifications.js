/**
 * Notifications Model
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Notifications Schema
const NotificationsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['EVENT', 'UPDATE'],
        required: true,
    },
}, {
    timestamps: true,
    skipVersioning: true,
});

// Intermediate Notifications Schema
// Connects the user with their read notifications
const UserNotificationsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    read: [{
        type: Schema.Types.ObjectId,
        ref: 'Notifications',
    }],
}, {
    timestamps: false,
    skipVersioning: true,
});

// Notifications Model
const Notifications = model('Notifications', NotificationsSchema);
const UserNotifications = model('UserNotifications', UserNotificationsSchema);

// Exporting Notifications
module.exports = { Notifications, UserNotifications };
