/**
 * Auth Routers
 */

// Dependencies
const Router = require('express').Router();
const authController = require('../controllers/auth');
const authSchemas = require('../schemas/auth');
const validateSchema = require('../middlewares/validator');
const { checkJwt, checkAuthRole } = require('../middlewares/auth');

Router.use(checkJwt);

/** --------------------------
 * UNAUTHENTICATED ROUTES
 * ---------------------------
*/

Router.post('/signup/cog', validateSchema('body', authSchemas.signupClubMemberSchema), authController.signupClubMember);

Router.post('/signup/cogc', validateSchema('body', authSchemas.signupCommunityMemberSchema), authController.signupCommunityMember);

Router.post('/login', validateSchema('body', authSchemas.loginUserSchema), authController.loginUser);

Router.post('/forgot-password', validateSchema('body', authSchemas.forgotPasswordSchema), authController.forgotPassword);

Router.post('/verify-otp', validateSchema('body', authSchemas.verifyOtpSchema), authController.verifyOtp);

Router.post('/reset-password', validateSchema('body', authSchemas.resetPasswordSchema), authController.resetPassword);

/** --------------------------
 * AUTHENTICATED ROUTES
 * ---------------------------
*/

Router.post('/role/admin', checkAuthRole(['ADMIN']), validateSchema('body', authSchemas.AuthRoleSchema), authController.updateAdminRole);

Router.post('/role/president', checkAuthRole(['ADMIN']), validateSchema('body', authSchemas.AuthRoleSchema), authController.updatePresidentRole);

Router.post('/role/alumni', checkAuthRole(['ADMIN', 'PRESIDENT']), validateSchema('body', authSchemas.AuthRoleSchema), authController.updateAlumniRole);

Router.post('/role/secretary', checkAuthRole(['ADMIN', 'PRESIDENT']), validateSchema('body', authSchemas.AuthRoleSchema), authController.updateSecretaryRole);

// Exporting Router
module.exports = Router;
