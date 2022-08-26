/**
 * Auth Controllers
 */

// Dependencies
const authMailer = require('../mail/auth');
const bcrypt = require('bcryptjs');

// Auth Controller Container
const AuthController = {};

AuthController.signupClubMember = async (req, res, next) => { };

AuthController.signupCommunityMember = async (req, res, next) => { };

AuthController.loginUser = async (req, res, next) => { };

// Exporting Controller
module.exports = AuthController;