const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const requestSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    requestType: {
        type: String,
        required: true
    },
    requestedDate: {
        type: Date,
        required: true
    },
    comments: [{
        body: String,
        date: Date,
        required: false
    }]
});

module.exports = Request = mongoose.model("requests", requestSchema);