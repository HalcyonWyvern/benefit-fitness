const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    // Required information section
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
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


    //Address Section
    address: {
        type: String,
        required: true,
        default: ""
    },
    city: {
        type: String,
        required: true,
        default: ""
    },
    state: {
        type: String,
        required: true,
        default: ""
    },
    zip: {
        type: String,
        required: true,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = User = mongoose.model("users", userSchema);
