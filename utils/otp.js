/**
 * OTP Generator and Validator
 */

// Dependencies
const cogcCache = require('./cache');
const { ApiError } = require('./custom');

const OTP_EXPIRE_DURATION = 600; // 10 mins

// OTP Container
const OtpContainer = {};

OtpContainer.genOtp = async (userId = '', length = 4) => {
    let [temp, count, LENGTH, otp, CACHED] = [length, 0, 1, 0, []];
    while (temp > 0) {
        LENGTH *= 10;
        temp--;
    }
    otp = Math.floor(Math.random() * LENGTH);
    temp = otp;
    while (temp > 0) {
        count++;
        temp = Math.ceil(temp / 10);
    };
    if (count !== length) {
        LENGTH = Math.ceil((LENGTH / 10) + (Math.random() * length))
        otp = otp + LENGTH;
    };
    otp = String(otp);
    CACHED = cogcCache.get(userId);
    if (CACHED) {
        cogcCache.set(userId, CACHED.concat[otp], OTP_EXPIRE_DURATION);
    } else {
        CACHED = [otp];
        cogcCache.set(userId, CACHED, OTP_EXPIRE_DURATION);
    }
    return otp;
};

OtpContainer.verifyOtp = async (userId = '', otp = '') => {
    const CACHE = cogcCache.get(userId);
    if (!CACHE) throw new ApiError({message: 'auth/otp-expired', statusCode: 401});
    const isValidOtp = CACHE.includes(otp);
    if (isValidOtp) return true;
    else throw new ApiError({message: 'auth/otp-invalid', statusCode: 401});
};

module.exports = OtpContainer;