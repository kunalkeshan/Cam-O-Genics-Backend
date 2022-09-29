/**
 * Application Jobs
 */

// Dependencies
const scheduler = require('node-schedule');
const Audit = require('../models/Audit');
const { clearExpiredOtps } = require('./otp');

const EVERY_TWO_MINS = '*/2 * * * *';
const EVERY_DAY = '0 0 * * *';

const clearAuditLogs = async () => {
    try {
        const currentDate = new Date();
        const audits = await Audit.find({}).limit(200);
        audits.forEach((audit) => {
            const auditCreatedDate = new Date(audit.createdAt);
            const numberOfDays = (currentDate.getTime() - auditCreatedDate().getTime()) / (1000 * 3600 * 24);
            if (numberOfDays > 30) {
                audit.delete();
            }
        });
        // eslint-disable-next-line no-empty
    } catch (error) { }
};

scheduler.scheduleJob('Delete expired otp files', EVERY_TWO_MINS, clearExpiredOtps);

scheduler.scheduleJob('Clear old audits, over a month old', EVERY_DAY, clearAuditLogs);
