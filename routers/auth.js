/**
 * Auth Routers
 */

// Dependencies
const Router = require('express').Router();
const authController = require('../controllers/auth');
const authSchemas = require('../schemas/auth');
const validateSchema = require('../middlewares/validator');

Router.post('/signup/cog', validateSchema('body', authSchemas.signupClubMemberSchema), authController.signupClubMember);

// Router.post('/signup/cogc', authController.signupCommunityMember);

Router.post('/login', validateSchema('body', authSchemas.loginUserSchema), authController.loginUser);

Router.post('/forgot-password', validateSchema('body', authSchemas.forgotPasswordSchema), authController.forgotPassword);

Router.post('/verify-otp', validateSchema('body', authSchemas.verifyOtpSchema), authController.verifyOtp);

Router.post('/reset-password', validateSchema('body', authSchemas.resetPasswordSchema), authController.resetPassword);

// Exporting Router
module.exports = Router;
