const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    // Required information section
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    isTrainer: {
        type: Boolean,
        required: true,
        default: false
    },

    // Optional Health and Wellness Section
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

    //Address Section
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = User = mongoose.model("users", userSchema);