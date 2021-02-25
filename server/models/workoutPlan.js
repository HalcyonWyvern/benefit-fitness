import mongoose from 'mongoose';
const { Schema } = mongoose;

const planSchema = new Schema({
    //workout plan stuff
})

const WorkoutPlan = mongoose.model('WorkoutPlan', planSchema);

export default WorkoutPlan;