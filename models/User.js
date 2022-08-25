/**
 * User Model
 */

// Dependencies
const {Schema, model} = require('mongoose');

// User Schema
const UserSchema = new Schema({});

// User Model
const User = model('User', UserSchema);

// Exporting User
module.exports = User;