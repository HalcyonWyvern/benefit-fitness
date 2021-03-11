const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const requestSchema = new Schema({
    user: {
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
    comments: {
        type: String,
        required: false,
        default: ""
    },
    contactMethod: {
        type: String,
        required: true
    }
});

module.exports = Request = mongoose.model("requests", requestSchema);