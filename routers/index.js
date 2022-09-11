/**
 * Router Hub
 */

// Dependencies
const Router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const eventsRouter = require('./events');

Router.use('/api/auth', authRouter);
Router.use('/api/user', userRouter);
Router.use('/api/events', eventsRouter);

// Exporting Router
module.exports = Router;
