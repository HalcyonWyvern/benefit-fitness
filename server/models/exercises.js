const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const exerciseSchema = new Schema({
    //items here
});

module.exports = Exercise = mongoose.model("requests", exerciseSchema);