const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    exercises: [{
            type: Schema.Types.ObjectId,
            ref: "exercises",
            required: true
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
    }
})

module.exports = Plan = mongoose.model("plans", planSchema);