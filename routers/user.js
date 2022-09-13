/**
 * User Routers
 */

// Dependencies
const Router = require('express').Router();
const userController = require('../controllers/user');
const validateSchema = require('../middlewares/validator');
const { checkAuthRole, checkJwt } = require('../middlewares/auth');
const userSchemas = require('../schemas/user');

Router.use(checkJwt);

Router.post('/name', checkAuthRole(['*']), validateSchema('body', userSchemas.updateNameSchema), userController.updateName);

Router.post('/phone', checkAuthRole(['*']), validateSchema('body', userSchemas.updatePhoneSchema), userController.updatePhone);

Router.post('/address', checkAuthRole(['*']), validateSchema('body', userSchemas.updateAddressSchema), userController.updateAddress);

Router.post('/password', checkAuthRole(['*']), validateSchema('body', userSchemas.updatePasswordSchema), userController.updatePassword);

Router.post(
    '/community-identities',
    checkAuthRole(['*']),
    validateSchema('body', userSchemas.updateCommunityIdentities),
    userController.updateCommunityIdentities,
);

// Exporting Router
module.exports = Router;
