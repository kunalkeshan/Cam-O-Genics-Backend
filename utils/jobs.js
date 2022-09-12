/**
 * Application Jobs
 */

// Dependencies
const scheduler = require('node-schedule');
const { clearExpiredOtps } = require('./otp');

scheduler.scheduleJob('Delete expired otp files', '* * * * *', clearExpiredOtps);
