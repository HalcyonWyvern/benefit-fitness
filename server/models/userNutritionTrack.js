const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userNutritionTrack = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    part: {
        type: String,
        default: "Morning"
    },
    foodEaten: [{
        foodName: {type: String, default: ""},
        calories: {type: String, default: ""},
        protein: {type: Number, default: 0},
        carbs: {type: Number, default: 0},
        sugar: {type: Number, default: 0},
        fat: {type: Number, default: 0}
    }]
});

module.exports = NutritionTrackerEntry = mongoose.model("nutritionTrackers", userNutritionTrack);