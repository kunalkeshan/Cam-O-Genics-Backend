/**
 * Club Controllers
 */

// Dependencies
const Club = require('../models/Club');

// Club Controller Container
const ClubController = {};

/** --------------------------
 * UNAUTHENTICATED CONTROLLERS
 * ---------------------------
*/

ClubController.getClubDetails = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

/** --------------------------
 * AUTHENTICATED CONTROLLERS
 * ---------------------------
*/

ClubController.createCommunityRole = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

ClubController.editCommunityRoleName = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

ClubController.editCommunityRoleDescription = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

ClubController.deleteCommunityRole = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

ClubController.editName = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

ClubController.editDescription = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

ClubController.editSocialLinks = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error);
    }
};

// Exporting Controller
module.exports = ClubController;
