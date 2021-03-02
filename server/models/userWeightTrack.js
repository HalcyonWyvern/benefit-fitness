const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userWeightTrack = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = WeightTrackerEntry = mongoose.model("weightTrackers", userWeightTrack);