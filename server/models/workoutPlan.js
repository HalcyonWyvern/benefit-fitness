const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const planSchema = new Schema({
    //workout plan stuff
})

module.exports = Plan = mongoose.model("plans", planSchema);