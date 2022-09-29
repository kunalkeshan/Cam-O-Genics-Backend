/**
 * Router Hub
 */

// Dependencies
const Router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const eventsRouter = require('./events');
const clubRouter = require('./club');
const notificationsRouter = require('./notifications');
const auditRouter = require('./audit');
const config = require('../config');
const { ApiError } = require('../utils/custom');

Router.get('/api', (req, res) => res.status(200).json({
    message: `Welcome to the CamOGenics API! To learn more about the API, head over to "${config.GITHUB_URL}".`,
    createdBy: [{ name: 'Kunal Keshan', email: 'kunalkeshan12@gmail.com' }, { name: 'Surendar PD', email: 'surendarpd007@gmail.com' }],
    success: true,
}));

Router.use('/api/auth', authRouter);
Router.use('/api/user', userRouter);
Router.use('/api/events', eventsRouter);
Router.use('/api/club', clubRouter);
Router.use('/api/notifications', notificationsRouter);
Router.use('/api/audit', auditRouter);

Router.get('/api/error', (req, res, next) => {
    try {
        if (req.query.key !== config.ERROR_API_KEY) throw new ApiError({ message: 'Invalid API Key', statusCode: 403 });
        throw new Error('Custom API Error Dispatched');
    } catch (error) {
        return next(error);
    }
});

// Exporting Router
module.exports = Router;
