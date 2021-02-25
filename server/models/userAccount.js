import mongoose from 'mongoose';
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    bio: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    exerciseGoal: {
        type: String,
        required: false
    },
    salt: String,
    hash: String,
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'})

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

const User = mongoose.model('User', userSchema);

export default User;