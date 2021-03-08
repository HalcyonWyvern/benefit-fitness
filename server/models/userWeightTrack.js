const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userWeightTrack = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },
    weightTrack: [{
        weight: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
});

module.exports = WeightTracker = mongoose.model("weightTrackers", userWeightTrack);

