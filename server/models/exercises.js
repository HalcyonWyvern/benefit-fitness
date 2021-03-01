const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseName : {
      type: String,
      unique: true,
    },
    equipment: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    exerciseType: {
        type: Schema.type,
        required: true
    },
    videoURL: {
        type: String,
        required: false
    }
});

module.exports = Exercise = mongoose.model("exercises", exerciseSchema);