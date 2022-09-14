/**
 * Club Model
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Club Schema
const ClubSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    links: {
        instagram: String,
        linkedIn: String,
        website: String,
        blog: String,
    },
    communityRoles: [{
        role: String,
        description: String,
    }],
}, {
    timestamps: true,
    skipVersioning: true,
});

// Club Model
const Club = model('Club', ClubSchema);

// Exporting Club
module.exports = Club;
