const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    exercises: [{
            type: "array",
            // type: Schema.Types.ObjectId,
            of: [
                {
                    title: "exerciseID",
                    type: Schema.Types._ObjectId,
                    ref: "exercises",
                    required: true
                },
                {
                    title: "sets",
                    type: Number,
                    required: false
                },
                {
                    title: "reps",
                    type: Number,
                    required: false
                },
                {
                    title: "time",
                    type: Number,
                    required: false
                }
            ]
            // ref: "exercises",
            // required: true
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