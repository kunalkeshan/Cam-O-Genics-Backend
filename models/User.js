/**
 * User Model
 */

// Dependencies
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    officialEmail: {
        type: String,
        required: true,
    },
    personalEmail: String,
    password: {
        type: String,
        required: true,
    },
    cogcId: {
        type: String,
    },
    phone: String,
    defaultAvatar: String,
    avatar: String,
}, {
    timestamps: true,
    strict: true,
});

// User Model
const User = model('User', UserSchema);

// Exporting User
module.exports = User;