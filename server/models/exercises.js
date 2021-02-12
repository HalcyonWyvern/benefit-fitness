import mongoose from 'mongoose';
const { Schema } = mongoose;

const exerciseEntry = new Schema({
    //items here
});

const Exercise = mongoose.model('Exercise', exerciseEntry);

export default Exercise;