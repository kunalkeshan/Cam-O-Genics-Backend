/**
 * Notifications Model
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Notifications Schema
const NotificationsSchema = new Schema({});

// Notifications Model
const Notifications = model('Notifications', NotificationsSchema);

// Exporting Notifications
module.exports = Notifications;
