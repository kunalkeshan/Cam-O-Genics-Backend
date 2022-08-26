/**
 * Auth Routers
 */

// Dependencies
const Router = require('express').Router();
const authController = require('../controllers/auth');
const authSchemas = require('../schemas/auth');
const validateSchema = require('../middlewares/validator');

Router.post('/signup/cog', authController.signupClubMember);

Router.post('/signup/cogc', authController.signupCommunityMember);

Router.post('/login', validateSchema('body', authSchemas.loginUserSchema), authController.loginUser);

// Exporting Router
module.exports = Router;