const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userPlanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'plans',
        required: true
    },
    trainerAdvice: {
        type: String,
        required: false,
        default: ""
    }
});
module.exports = UserPlan = mongoose.model("userplans", userPlanSchema);