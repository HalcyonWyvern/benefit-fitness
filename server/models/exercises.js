const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseName : {
        type: String,
        unique: true,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    sets: {
        type: String,
        required: true
    },
    reps: {
        type: String,
        required: true
    },
    exerciseType: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: false
    },
    instructions: {
        type: String,
        required: true
    }
});

module.exports = Exercise = mongoose.model("exercises", exerciseSchema);