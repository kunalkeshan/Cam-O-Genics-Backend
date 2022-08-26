/**
 * User Model
 */

// Dependencies
const { Schema, model, version } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

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
    registerNo: String,
    cogcId: {
        type: String,
    },
    phone: String,
    defaultAvatar: String,
    avatar: String,
    address: String,
    memberRole: {
        type: String,
        enum: ['COGC', 'COG'], // CamOGenics Community, CamOGenics Member
        required: true,
    },
    authRole: {
        type: String,
        enum: ['ADMIN', 'PRESIDENT', 'SECRETARY', 'ALUMNI'],
    },
    communityRoles: [{
        type: String,
        enum: ['PHOTOGRAPHER', 'GRAPHIC DESIGNER', 'VIDEO EDITOR'],
    }],
    links: {
        instagram: String,
        linkedIn: String,
        gitHub: String,
        youtube: String,
        twitter: String,
        website: String,
        blog: String,
        drivePhotos: String,
        behance: String,
        dribble: String,
    }
}, {
    timestamps: true,
    strict: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    skipVersioning: true,
});

// User Method and Statics

UserSchema.virtual('token').get(function () {
    const token = jwt.sign(this._id.toString(), JWT_SECRET, { expiresIn: '1y' });
    return token;
});

UserSchema.methods.generateHashedPassword = async function () {
    const SALT = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, SALT);
};

UserSchema.methods.generateDefaultAvatar = async function () {
    const fullName_spaceAdjusted = this.fullName.replace(/\W+/, '%20');
    this.defaultAvatar = `https://avatars.dicebear.com/api/initials/${fullName_spaceAdjusted}.svg`;
};

UserSchema.methods.sanitize = function () {
    const user = this.toJSON();
    delete user.password;
    return user;
}

// Hooks
UserSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            await this.generateHashedPassword();
        }
        if (this.isNew) {
            await this.generateDefaultAvatar();
        }
    } catch (_) { }
    next();
})

// User Model
const User = model('User', UserSchema);

// Exporting User
module.exports = User;