const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const Plan = require("../../models/workoutPlan");
const Exercise = require("../../models/exercises");

const isAdmin = require("../../middlewares/isAdmin");

// @route POST api/plans
// @desc Create a new (EMPTY) Workout Plan
// @desc API for adding plans is below! PUT method inserts following exercises.
// @access Private
router.post("/",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Exercise.findOne({exerciseName: req.body.exercise}).then(exercise => {
        if (exercise) {
            const newPlan = new Plan({
                name: req.body.name,
                trainerExplanation: req.body.trainerExplanation,
                type: req.body.type,
                exercises: [{
                    exercise: exercise
                }]
            })
            newPlan
                .save()
                .then(plan => {
                    res.json(plan);
                })
                .catch(err => console.log(err));
        } else {
            return res.status(404).json({exercise: "Selected Exercise not found."})
        }
    })
})

// @route GET api/plans
// @desc Get all workout plans in the library
// @access Private
router.get("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Plan.find()
        .populate("exercises.exercise", "exerciseName")
        .sort({ type: -1 }) // descending order
        .then(plans => res.json(plans));
});

// @route GET api/plans/:id
// @desc Get Workout Plan by ID
// @access Private
router.get("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Plan.findById({_id: req.params.id })
        .populate("exercises.exercise", "exerciseName")
        .then(plan => res.json(plan));
})

// @route DELETE api/plans/:id
// @desc Delete workout plan by ID
// @access Private
router.delete("/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Plan.findByIdAndDelete({_id: req.params.id})
        .then(plan => {
            res.json({plan, success: true})
        })
        .catch(err => {
            res.status(404).json({success: false})
            console.log(err)
        })
})

// @route PUT api/plans/add/:id
// @desc Add exercise to plan by exercise name
// @access Private
router.put("/add/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Exercise.findOne({exerciseName: req.body.exercise}).then(exercise => {
        if(exercise) {
            Plan.findById({_id: req.params.id})
                .then(plan => {
                    plan.exercises.push({
                        exercise: exercise
                    })
                    plan
                        .populate("exercises.exercise", "exerciseName")
                        .save()
                        .then(plan => {
                            res.json(plan);
                    })
                })
                .catch(err => console.log(err));
        } else {
            return res.status(404).json({exercise: "Exercise not found!"})
        }
    })
})

// @route PUT api/plans/remove/:id
// @desc Remove exercise from plan by exercise name
// @access Private
// TODO
// Another pain in the ass. Just use the delete button and start fresh, honestly.

module.exports = router;