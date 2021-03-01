const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "plans",
        required: true
    }],
    trainerExplanation: {
        type: String,
        required: true
    }
})

module.exports = Plan = mongoose.model("plans", planSchema);