/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/**
 * OTP Generator and Validator
 */

// Dependencies
const fs = require('fs');
const path = require('path');
const { ApiError } = require('./custom');

const OTP_EXPIRE_DURATION = 600000; // 10 mins

const otpDataPath = (userId) => path.join(__dirname, '..', '.data/otp', `${userId}.json`);

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
    const otpPath = otpDataPath(userId);

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

    const dirPath = path.join(__dirname, '..', '/.data/otp');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Set otp in cache
    fs.readFile(otpPath, 'utf8', (err, data) => {
        if (!err && data) {
            const otpData = JSON.parse(data);
            otpData.push({ otp, expiresIn: Date.now() + OTP_EXPIRE_DURATION });
            fs.writeFileSync(otpPath, JSON.stringify(otpData));
        } else {
            CACHED = [{ otp, expiresIn: Date.now() + OTP_EXPIRE_DURATION }];
            fs.writeFileSync(otpPath, JSON.stringify(CACHED));
        }
    });

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
    try {
        const CACHE = JSON.parse(fs.readFileSync(otpDataPath(userId), 'utf8'));
        if (!CACHE) throw new ApiError({ message: 'auth/otp-expired', statusCode: 401 });
        const isValidOtp = CACHE.find((data) => data.otp === otp);
        if (isValidOtp) {
            fs.unlinkSync(otpDataPath(userId));
            return true;
        }
        throw new ApiError({ message: 'auth/otp-invalid', statusCode: 401 });
    } catch (error) {
        throw new ApiError({ message: 'auth/otp-unauthorized', statusCode: 401 });
    }
};

OtpContainer.clearExpiredOtps = async function () {
    fs.readdir(path.join(__dirname, '../.data/otp'), (err, files) => {
        if (!err && files) {
            files.forEach((file) => {
                const filePath = path.join(__dirname, '../.data/otp', file);
                fs.readFile(filePath, 'utf8', (error, data) => {
                    if (!error && data) {
                        let otps = JSON.parse(data);
                        otps = otps.filter((otp) => Date.now() <= otp.expiresIn);
                        if (otps.length === 0) {
                            fs.unlinkSync(filePath);
                        } else {
                            fs.writeFileSync(filePath, JSON.stringify(otps));
                        }
                    }
                });
            });
        }
    });
};

module.exports = OtpContainer;
