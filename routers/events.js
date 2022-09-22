/**
 * Events Routers
 */

// Dependencies
const Router = require('express').Router();
const eventsController = require('../controllers/events');
const eventsSchema = require('../schemas/events');
const validateSchema = require('../middlewares/validator');
const { checkJwt, checkAuthRole } = require('../middlewares/auth');

Router.use(checkJwt);

/** --------------------------
 * UNAUTHENTICATED ROUTES
 * ---------------------------
*/

/** --------------------------
 * AUTHENTICATED ROUTES
 * ---------------------------
*/

Router.post(
    '/create',
    checkAuthRole(['ADMIN', 'PRESIDENT', 'SECRETARY']),
    validateSchema('body', eventsSchema.newEventSchema),
    eventsController.createNewEvent,
);

// Exporting Router
module.exports = Router;
