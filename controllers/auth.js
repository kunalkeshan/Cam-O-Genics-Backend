/**
 * Auth Controllers
 */

// Dependencies
const authMailer = require('../mail/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../utils/custom');

// Auth Controller Container
const AuthController = {};

AuthController.signupClubMember = async (req, res, next) => {
    const { fullName, cogcId, email, password } = req.body;
    try {
        let user = await User.findOne({ officialEmail: email });
        if (user) throw new ApiError({ message: 'auth/account-already-exists', statusCode: 409 });

    } catch (error) {
        next(error);
    }
};

AuthController.signupCommunityMember = async (req, res, next) => { };

AuthController.loginUser = async (req, res, next) => { };

// Exporting Controller
module.exports = AuthController;