/**
 * User Routers
 */

// Dependencies
const Router = require('express').Router();
const userController = require('../controllers/user');
const validateSchema = require('../middlewares/validator');
const userSchemas = require('../schemas/user');

Router.post('/name', validateSchema(userSchemas.updateNameSchema), userController.updateName);

Router.post('/phone', validateSchema(userSchemas.updatePhoneSchema), userController.updatePhone);

Router.post('/address', validateSchema(userSchemas.updateAddressSchema), userController.updateAddress);

Router.post('/password', validateSchema(userSchemas.updatePasswordSchema), userController.updatePassword);

Router.post('/community-identities', validateSchema(userSchemas.updateCommunityIdentities), userController.updateCommunityIdentities);

// Exporting Router
module.exports = Router;
