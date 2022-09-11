/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */ // Remove Later
/**
 * User Controllers
 */

// Dependencies
const User = require('../models/User');
const { ApiError } = require('../utils/custom');

// User Controller Container
const UserController = {};

UserController.updateName = async (req, res, next) => {
    const { fullName } = req.body;
    const { user } = req;
    try {
        if (fullName.length < 0) throw new ApiError({ message: 'user/name-cannot-be-empty', statusCode: 400 });
        await User.updateOne({ id: user.id }, { fullName });

        return res.status(200).json({
            message: 'user/name-updated',
            data: { fullName },
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

UserController.updatePhone = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

UserController.updateAddress = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

UserController.updatePassword = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

UserController.updateCommunityIdentities = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

// Exporting Controller
module.exports = UserController;
