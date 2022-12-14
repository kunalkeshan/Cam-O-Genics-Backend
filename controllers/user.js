/**
 * User Controllers
 */

// Dependencies
const User = require('../models/User');
const { ApiError } = require('../utils/custom');

// User Controller Container
const UserController = {};

/** --------------------------
 * UNAUTHENTICATED CONTROLLERS
 * ---------------------------
*/

/**
 * @description Fetch list of cog members who are not admin
 * @api /api/user/cog/client
 * @method GET
 */
UserController.getClubMembersForClient = async (req, res, next) => {
    try {
        const members = await User.find({ memberRole: 'COG', authRole: { $ne: 'ADMIN' } })
            .select('id fullName defaultAvatar avatar links headline about').populate('communityIdentities', 'role').lean();
        return res.status(200).json({
            message: 'user/cog-users-for-client',
            data: { members },
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

/** --------------------------
 * AUTHENTICATED CONTROLLERS
 * ---------------------------
*/

UserController.updateName = async (req, res, next) => {
    const { fullName } = req.body;
    const { user } = req;
    try {
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
    const { phone } = req.body;
    const { user } = req;
    try {
        await User.updateOne({ id: user.id }, { phone });

        return res.status(200).json({
            message: 'user/phone-updated',
            data: { phone },
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

UserController.updateAddress = async (req, res, next) => {
    const { address } = req.body;
    const { user } = req;
    try {
        if (address.length < 0) throw new ApiError({ message: 'user/address-cannot-be-empty', statusCode: 400 });
        await User.updateOne({ id: user.id }, { address });

        return res.status(200).json({
            message: 'user/address-updated',
            data: { address },
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

UserController.updatePassword = async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;
    try {
        const isSamePassword = await user.compareHashedPassword(password);

        if (isSamePassword) throw new ApiError({ message: 'user/password-cannot-be-same', statusCode: 409 });

        user.password = password;
        await user.save();

        return res.status(200).json({
            message: 'user/password-updated',
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

UserController.updateCommunityIdentities = async (req, res, next) => {
    const { communityIdentities } = req.body;
    const { user } = req;
    try {
        user.communityIdentities = communityIdentities;
        return res.status(200).json({});
    } catch (error) {
        return next(error);
    }
};

// Exporting Controller
module.exports = UserController;
