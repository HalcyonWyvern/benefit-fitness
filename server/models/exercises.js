const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseID: {
        type: Schema.Types.ObjectId,
        index: true,
        unique: true
    },
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
    video: {
        type: String,
        required: false
    }
});

module.exports = Exercise = mongoose.model("exercises", exerciseSchema);