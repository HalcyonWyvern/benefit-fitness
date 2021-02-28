const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    planID: {
        type: Schema.Types.ObjectId,
        index: true,
        unique: true
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "plans",
        required: true
    }],
    comments: [{
        type: String,
        required: false
    }],
    trainerExplanation: {
        type: String,
        required: true
    }
})

module.exports = Plan = mongoose.model("plans", planSchema);