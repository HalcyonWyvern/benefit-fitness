const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    exercises: [{
        exerciseID: {
            type: Schema.Types.ObjectId,
            ref: "exercises",
            required: true
        },
        reps: {
            type: Number,
            required: true,
            default: 0
        },
        sets: {
            type: Number,
            required: true,
            default: 0
        },
        time: {
            type: Number,
            required: true,
            default: 60
        }
    }],
    trainerExplanation: {
        type: String,
        required: false,
        default: ""
    },
    type: {
        type: String,
        required: false,
        default: "Default Plan Type"
    },
    tag: {
        type: String,
        required: false,
        default: ""
    }
})

module.exports = Plan = mongoose.model("plans", planSchema);