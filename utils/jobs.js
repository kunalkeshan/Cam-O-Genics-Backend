/**
 * Application Jobs
 */

// Dependencies
const scheduler = require('node-schedule');
const { clearExpiredOtps } = require('./otp');

const EVERY_TWO_MINS = '*/2 * * * *';

// Check for expired otps every two mins
scheduler.scheduleJob('Delete expired otp files', EVERY_TWO_MINS, clearExpiredOtps);
