/**
 * Auth Middleware
 */

// Dependencies
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');
const { ApiError } = require('../utils/custom');

const checkJwt = async (req, res, next) => {
    const [type = '', token = ''] = req.headers?.authorization ? req.headers.authorization.split(' ') : [];
    try {
        if (!token) return next();
        const decoded = jwt.verify(token, JWT_SECRET);
        if (Date.now() > decoded.exp) { throw new ApiError({ message: 'auth/token-expired', statusCode: 401 }); }
        const user = await User.findById(decoded);
        req.user = user;
        req.auth = { type, token };
        return next();
    } catch (error) {
        return next(error);
    }
};

const checkAuthRole = (ALLOWED_ROLES = []) => async (req, res, next) => {
    try {
        if (req.auth?.type !== 'Bearer') {
            throw new ApiError({
                message: 'auth/bearer-token-required',
                statusCode: 401,
                data: { message: 'Authorization header requires bearer token, view given example', headers: 'authorization: "Bearer <token>"' },
            });
        }
        if (!req.user && !req.auth?.token) throw new ApiError({ message: 'auth/user-token-invalid', statusCode: 401 });
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
