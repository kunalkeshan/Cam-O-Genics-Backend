/**
 * Events Controllers
 */

// Dependencies
const Events = require('../models/Event');
const Users = require('../models/User');
// const Notifications = require('../models/Notifications');
const { sendNewEventEmail } = require('../mail/events');

// Events Controller Container
const EventsController = {};

/** --------------------------
 * UNAUTHENTICATED CONTROLLERS
 * ---------------------------

// EventsController.getActiveEvents = async (req, res, next) => {};

// EventsController.getCompletedEvents = async (req, res, next) => {};

/** --------------------------
 * UNAUTHENTICATED CONTROLLERS
 * ---------------------------
*/

EventsController.createNewEvent = async (req, res, next) => {
    try {
        let event = new Events({ ...req.body, createdBy: req.user.id });
        event.lastUpdatedBy.push({ user: req.user.id });
        await event.save();
        event = await event.sanitize();

        if (req.body.sendEmails) {
            const userEmails = await Users.find({ 'settings.emails.events': true }).select('officialEmail').lean();
            sendNewEventEmail({ emailList: userEmails, event });
        }

        return res.status(200).json({
            message: 'events/new-event-created',
            data: { event },
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

// EventsController.updateEvent = async (req, res, next) => { };

// EventsController.deleteEvent = async (req, res, next) => { };

// Exporting Controller
module.exports = EventsController;
