const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userProfile = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

// Optional Health and Wellness Section
    bio: {
        type: String,
        required: false,
        default: "There's nothing here yet."
    },
    height: {
        type: Number,
        required: false,
        default: 0
    },
    weight: {
        type: Number,
        required: false,
        default: 0
    },
    exerciseGoal: {
        type: String,
        required: false,
        default: "None Specified"
    },
});

module.exports = Profile = mongoose.model("profiles", userProfile);