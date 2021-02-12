import mongoose from 'mongoose';
const { Schema } = mongoose;

const requestSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
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
        required: false
    },
    comments: [{
        body: String,
        date: Date,
        required: false
    }]
});

const Request = mongoose.model('Request', requestSchema);

export default Request;