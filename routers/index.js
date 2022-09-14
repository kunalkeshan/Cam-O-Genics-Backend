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

Router.use('/api/auth', authRouter);
Router.use('/api/user', userRouter);
Router.use('/api/events', eventsRouter);
Router.use('/api/club', clubRouter);
Router.use('/api/notifications', notificationsRouter);

// Exporting Router
module.exports = Router;
