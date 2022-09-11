/* eslint-disable no-plusplus */
/**
 * OTP Generator and Validator
 */

// Dependencies
const cogcCache = require('./cache');
const { ApiError } = require('./custom');

const OTP_EXPIRE_DURATION = 600; // 10 mins

// OTP Container
const OtpContainer = {};

/**
 * @description generate an otp for a user, and saves it into cache.
 * @param {string} userId
 * @param {number} length
 * @returns Promise<string>
 */
OtpContainer.genOtp = async (userId = '', length = 4) => {
    // Initialize variables
    let [temp, count, setLength, otp, CACHED] = [length, 0, 1, 0, []];

    // Set length of otp, for generation
    // If length = 3
    // then, setLength = 1000
    while (temp > 0) {
        setLength *= 10;
        temp--;
    }

    // Generate Otp with Length set above.
    otp = Math.floor(Math.random() * setLength);

    // Finding length of otp generated
    temp = otp;
    while (temp > 0) {
        count++;
        temp = Math.floor(temp / 10);
    }

    // If length does not match, then adjust otp
    if (count !== length) {
        // Reduce length by 10 and add a new number to it
        setLength = Math.ceil((setLength / 10) + (Math.random() * length));
        // Add number set above with otp to adjust the lenth
        otp += setLength;
    }

    // Convert otp to string
    otp = String(otp);

    // Set otp in cache
    CACHED = cogcCache.get(userId);
    if (CACHED) {
        cogcCache.set(userId, CACHED.concat[otp], OTP_EXPIRE_DURATION);
    } else {
        CACHED = [otp];
        cogcCache.set(userId, CACHED, OTP_EXPIRE_DURATION);
    }

    // Return otp
    return otp;
};

/**
 * Verify if otp exists in cache, if not throws an error if invalid or expired
 * @param {string} userId
 * @param {string} otp
 * @returns Promise<boolean>
 */
OtpContainer.verifyOtp = async (userId = '', otp = '') => {
    const CACHE = cogcCache.get(userId);
    if (!CACHE) throw new ApiError({ message: 'auth/otp-expired', statusCode: 401 });
    const isValidOtp = CACHE.includes(otp);
    if (isValidOtp) return true;
    throw new ApiError({ message: 'auth/otp-invalid', statusCode: 401 });
};

module.exports = OtpContainer;
