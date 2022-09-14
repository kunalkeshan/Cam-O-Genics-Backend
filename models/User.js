/* eslint-disable func-names */
/**
 * User Model
 */

// Dependencies
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const { UserNotifications } = require('./Notifications');
const { JWT_SECRET, AUTH_ROLES } = require('../config');
const { ApiError } = require('../utils/custom');

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
    personalEmail: {
        type: String,
        public: {
            type: Boolean,
            default: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    registerNo: String,
    cogcId: {
        type: String,
    },
    phone: {
        type: String,
        public: {
            type: Boolean,
            default: true,
        },
    },
    defaultAvatar: String,
    avatar: String,
    address: String,
    headline: String,
    about: String,
    dob: {
        date: Date,
        public: {
            type: Boolean,
            default: true,
        },
    },
    memberRole: {
        type: String,
        enum: ['COGC', 'COG'], // CamOGenics Community, CamOGenics Member
        required: true,
    },
    authRole: {
        type: String,
        enum: AUTH_ROLES,
        default: 'MEMBER',
    },
    communityIdentities: [{
        type: [Schema.Types.ObjectId],
        ref: 'Club.communityRoles',
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
    },
    settings: {
        emails: {
            events: {
                type: Boolean,
                default: true,
            },
            account: {
                type: Boolean,
                default: true,
                immutable: true,
            },
            updates: {
                type: Boolean,
                default: true,
            },
        },
    },
}, {
    timestamps: true,
    strict: true,
    skipVersioning: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

// User Method and Statics

UserSchema.virtual('token').get(function () {
    const token = jwt.sign(this.id, JWT_SECRET);
    return token;
});

UserSchema.methods.generateHashedPassword = async function () {
    const SALT = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, SALT);
};

UserSchema.methods.compareHashedPassword = async function (password) {
    const isValidPassword = await bcrypt.compare(password, this.password);
    return isValidPassword;
};

UserSchema.methods.generateDefaultAvatar = async function () {
    const fullNameSpaceAdjusted = this.fullName.replace(/\W+/, '%20');
    this.defaultAvatar = `https://avatars.dicebear.com/api/initials/${fullNameSpaceAdjusted}.svg`;
};

UserSchema.methods.sanitize = async function () {
    await this.populate('communityIdentities');
    const user = this.toJSON();
    delete user.password;
    user.createdAt = format(new Date(user.createdAt), 'PPP');
    user.updatedAt = format(new Date(user.updatedAt), 'PPP');
    return user;
};

UserSchema.statics.cascadeAuthRole = async function ({ userId, role, assign }) {
    // eslint-disable-next-line no-use-before-define
    const user = await User.findById(userId);
    if (!user) throw new ApiError({ message: 'auth/account-does-not-exist', statusCode: 404 });
    if (AUTH_ROLES.includes(role)) throw new ApiError({ message: 'auth/invalid-role', statusCode: 400 });
    if (assign) {
        if (user.authRole === role) throw new ApiError({ message: 'auth/user-role-already-assigned', statusCode: 409 });
        user.authRole = role;
    } else {
        if (user.authRole !== role) throw new ApiError({ message: 'auth/user-role-not-assigned', statusCode: 404 });
        user.authRole = 'MEMBER';
    }
    await user.save();
    return Promise.resolve();
};

// Hooks
UserSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            await this.generateHashedPassword();
        }
        if (this.isNew) {
            await this.generateDefaultAvatar();
        }
        // eslint-disable-next-line
    } catch (_) { }
    next();
});

UserSchema.post('save', async function (user, next) {
    if (this.isNew) {
        // eslint-disable-next-line no-underscore-dangle
        await UserNotifications.create({ userId: user._id });
    }
    next();
});

// User Model
const User = model('User', UserSchema);

// Exporting User
module.exports = User;
