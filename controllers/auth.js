/**
 * Auth Controllers
 */

// Dependencies
const jwt = require('jsonwebtoken');
const authMailer = require('../mail/auth');
const User = require('../models/User');
const Audit = require('../models/Audit');
const otpUtil = require('../utils/otp');
const { ApiError } = require('../utils/custom');
const { JWT_SECRET } = require('../config');

// Auth Controller Container
const AuthController = {};

/** --------------------------
 * UNAUTHENTICATED CONTROLLERS
 * ---------------------------
*/

/**
 * @description Signup a new CamOGenics Club Member
 * @api /api/auth/signup/cog
 * @method POST
 */
AuthController.signupClubMember = async (req, res, next) => {
    const {
        fullName, cogcId, email, password,
    } = req.body;
    try {
        let user = await User.findOne({ $or: [{ officialEmail: email }, { cogcId }] });
        if (user) throw new ApiError({ message: 'auth/account-already-exists', statusCode: 409 });

        user = new User({
            fullName, cogcId, password, officialEmail: email, memberRole: 'COG',
        });
        await user.save();

        user = await user.sanitize();
        authMailer.sendClubMemberSignup(user);

        return res.status(201).json({
            message: 'auth/cog-account-created',
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Signup a new CamOGenics Community Member
 * @api /api/auth/signup/cogc
 * @method POST
 */
AuthController.signupCommunityMember = async (req, res, next) => {
    const {
        fullName, registerNo, email, password,
    } = req.body;
    try {
        let user = await User.findOne({ officialEmail: email });
        if (user) throw new ApiError({ message: 'auth/account-already-exists', statusCode: 409 });

        user = new User({
            fullName, registerNo, password, officialEmail: email, memberRole: 'COGC',
        });
        await user.save();

        user = await user.sanitize();
        authMailer.sendCommunityMemberSignup(user);

        return res.status(201).json({
            message: 'auth/cogc-account-created',
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Login User
 * @api /api/auth/login
 * @method POST
 */
AuthController.loginUser = async (req, res, next) => {
    const { user, password } = req.body;
    try {
        let loginUser = await User.findOne({ $or: [{ officialEmail: user }, { cogcId: user }, { phone: user }] });
        if (!loginUser) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });

        const isValidPassword = await loginUser.compareHashedPassword(password);
        if (!isValidPassword) throw new ApiError({ message: 'auth/invalid-password', statusCode: 401 });

        loginUser = await loginUser.sanitize();
        Audit.create({ for: 'LOGIN', userId: loginUser.id });

        return res.status(200).json({
            message: 'auth/user-login-successful',
            data: { loginUser },
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Send an email to user who forgot password
 * @api /api/auth/forgot-password
 * @method POST
 */
AuthController.forgotPassword = async (req, res, next) => {
    const { user } = req.body;
    try {
        const fpUser = await User.findOne({ $or: [{ officialEmail: user }, { cogcId: user }, { phone: user }] });
        if (!fpUser) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });

        const otp = await otpUtil.genOtp(fpUser.id, 4);
        const TenMins = 1000 * 60 * 10;
        const expiresIn = Date.now() + TenMins;

        authMailer.sendForgotPassword({ ...fpUser.toJSON(), otp });
        Audit.create({ for: 'REQUEST', userId: fpUser.id, message: 'Requested to Change Password.' });

        return res.status(200).json({
            message: 'auth/otp-session-live',
            data: { id: fpUser.id, expiresIn },
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Verify otp for a given session
 * @api /api/auth/verify-otp
 * @method POST
 */
AuthController.verifyOtp = async (req, res, next) => {
    const { id, otp } = req.body;
    try {
        await otpUtil.verifyOtp(id, otp);
        let user = await User.findById(id).select('fullName officialEmail defaultAvatar avatar createdAt updatedAt');
        if (!user) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });

        user = await user.sanitize();

        return res.status(200).json({
            message: 'auth/valid-otp',
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description If OTP matches, allow user to reset password
 * @api /api/auth/reset-password
 * @method POST
 */
AuthController.resetPassword = async (req, res, next) => {
    const { token, password } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (Date.now() > decoded.exp) { throw new ApiError({ message: 'auth/token-expired', statusCode: 401 }); }

        const user = await User.findById(decoded);
        user.password = password;
        await user.save();

        authMailer.sendPasswordChanged(user.toJSON());
        Audit.create({ for: 'UPDATE', userId: user.id, message: 'Password reset done.' });

        return res.status(200).json({
            message: 'auth/reset-password-successful',
        });
    } catch (error) {
        return next(error);
    }
};

/** --------------------------
 * AUTHENTICATED CONTROLLERS
 * ---------------------------
*/

/**
 * @description Change ADMIN role
 * @api /api/auth/role/admin
 * @method POST
 */
AuthController.updateAdminRole = async (req, res, next) => {
    const { userId, role, assign } = req.body;
    try {
        await User.cascadeAuthRole({ userId, role, assign });
        const message = assign ? 'auth/admin-role-assigned' : 'auth/admin-role-removed';
        return res.status(200).json({ message });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Change PRESIDENT role
 * @api /api/auth/role/president
 * @method POST
 */
AuthController.updatePresidentRole = async (req, res, next) => {
    const { userId, role, assign } = req.body;
    try {
        await User.cascadeAuthRole({ userId, role, assign });
        const message = assign ? 'auth/president-role-assigned' : 'auth/president-role-removed';
        return res.status(200).json({ message });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Change SECRETARY role
 * @api /api/auth/role/secretary
 * @method POST
 */
AuthController.updateSecretaryRole = async (req, res, next) => {
    const { userId, role, assign } = req.body;
    try {
        await User.cascadeAuthRole({ userId, role, assign });
        const message = assign ? 'auth/secretary-role-assigned' : 'auth/secretary-role-removed';
        return res.status(200).json({ message });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description Change ALUMNI role
 * @api /api/auth/role/alumni
 * @method POST
 */
AuthController.updateAlumniRole = async (req, res, next) => {
    const { userId, role, assign } = req.body;
    try {
        await User.cascadeAuthRole({ userId, role, assign });
        const message = assign ? 'auth/alumni-role-assigned' : 'auth/alumni-role-removed';
        return res.status(200).json({ message });
    } catch (error) {
        return next(error);
    }
};

// Exporting Controller
module.exports = AuthController;
