/**
 * Auth Middleware
 */

// Dependencies
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');
const { ApiError } = require('../utils/custom');

const checkJwt = async (req, res, next) => {
    const token = req.headers.Authorization.split(' ').pop();
    try {
        if (!token) return next();
        const decoded = jwt.verify(token, JWT_SECRET);
        if (Date.now() > decoded.exp) { throw new ApiError({ message: 'auth/token-expired', statusCode: 401 }); }
        const user = await User.findById(decoded.payload);
        req.user = user;
        req.token = token;
        return next();
    } catch (error) {
        return next(error);
    }
};

const checkAuthRole = (ALLOWED_ROLES = []) => async (req, res, next) => {
    try {
        if (!req.user && !req.token) throw new ApiError({ message: 'auth/user-token-invalid', statusCode: 401 });
        if (ALLOWED_ROLES.includes('*')) return next();
        const USER_HAS_ROLE = ALLOWED_ROLES.includes(req.user.authRole);
        if (USER_HAS_ROLE) return next();
        throw new ApiError({ message: 'auth/user-access-denied-missing-roles', statusCode: 401 });
    } catch (error) {
        return next(error);
    }
};

// Exporting middlewares
module.exports = { checkJwt, checkAuthRole };
