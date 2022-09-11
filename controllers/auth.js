/**
 * Auth Controllers
 */

// Dependencies
const authMailer = require('../mail/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const otpUtil = require('../utils/otp');
const { ApiError } = require('../utils/custom');
const { JWT_SECRET } = require('../config');
const { sendClubMemberSignup } = require('../mail/auth');

// Auth Controller Container
const AuthController = {};

AuthController.signupClubMember = async (req, res, next) => {
    const { fullName, cogcId, email, password } = req.body;
    try {
        let user = await User.findOne({ officialEmail: email });
        if (user) throw new ApiError({ message: 'auth/account-already-exists', statusCode: 409 });

        user = new User({ fullName, cogcId, password, officialEmail: email, memberRole: 'COG' });
        await user.save();

        user = await user.sanitize();
        sendClubMemberSignup(user);

        return res.status(201).json({
            message: 'auth/cog-account-created',
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
};

AuthController.signupCommunityMember = async (req, res, next) => { };

AuthController.loginUser = async (req, res, next) => {
    const { user, password } = req.body;
    try {
        let loginUser = await User.findOne({ '$or': [{ officialEmail: user }, { cogcId: user }, { phone: user }] });
        if (!loginUser) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });

        const isValidPassword = await loginUser.compareHashedPassword(password);
        if (!isValidPassword) throw new ApiError({ message: 'auth/invalid-password', statusCode: 401 });

        loginUser = await loginUser.sanitize();

        return res.status(201).json({
            message: 'auth/user-login-successful',
            data: { loginUser },
        });
    } catch (error) {
        return next(error);
    }
};

AuthController.forgotPassword = async (req, res, next) => {
    const { user } = req.body;
    try {
        const fpUser = await User.findOne({ '$or': [{ officialEmail: user }, { cogcId: user }, { phone: user }] }).lean();
        if (!fpUser) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });

        const otp = await otpUtil.genOtp(fpUser.id, 4);
        const _10Mins = 1000 * 60 * 10;
        const expiresIn = Date.now() + _10Mins;

        return res.status(200).json({
            message: 'auth/otp-session-live',
            data: { id: fpUser.id, otp, expiresIn }
        })
    } catch (error) {
        return next(error);
    }
};

AuthController.verifyOtp = async (req, res, next) => {
    const { id, otp } = req.body;
    try {
        await otpUtil.verifyOtp(id, otp);
        let user = await User.findById(id).select("fullName officialEmail defaultAvatar avatar");
        if (!user) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });

        user = await user.sanitize();

        return res.status(200).json({
            message: 'auth/valid-otp',
            data: { user }
        })
    } catch (error) {
        return next(error);
    }
};

AuthController.resetPassword = async (req, res, next) => {
    const { token, password } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (Date.now() > decoded.exp)
            throw new ApiError({ message: 'auth/token-expired', statusCode: 401 });

        const user = await User.findById(decoded.payload);
        user.password = password;
        await user.save();

        return res.status(200).json({
            message: 'auth/reset-password-successful',
        });
    } catch (error) {
        return next(error);
    }
};

// Exporting Controller
module.exports = AuthController;