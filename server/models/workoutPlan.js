const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    planID: {
        type: Number,
        index: true,
        unique: true
    }
})

module.exports = Plan = mongoose.model("plans", planSchema);