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
// @desc API for adding plans is below! PUT method ADDS EXERCISES.
// @access Private
router.post("/",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Plan.findOne({name: req.body.name}).then(plan => {
        if (!plan) {
            const newPlan = new Plan({
                name: req.body.name,
                trainerExplanation: req.body.trainerExplanation,
                type: req.body.type,
            })
            newPlan
                .save()
                .then(plan => {
                    res.json(plan);
                })
                .catch(err => console.log(err));
        } else {
            return res.status(404).json({name: "Exercise Plan is already created."})
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
        .populate("exercises", "exerciseName")
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
        .populate("exercises", "exerciseName")
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
// @desc Add exercise to plan (The ID) by exercise name(req.body.exercise)
// @access Private
router.put("/add/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Exercise.findOne({exerciseName: req.body.exercise}).then(exercise => {
        if(exercise) {
            Plan.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    $push: {
                        exercises: exercise
                    }
                },
                {new: true}
                )
                .populate("exercises", "exerciseName")
                .then(plan => {
                        res.json(plan)
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
// Currently not working. I'll fix if we add this
// TODO
router.put("/remove/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
        Exercise.findOne({exerciseName: req.body.exercise}).then(exercise => {
            if(exercise) {
                Plan.findByIdAndUpdate(
                    {_id: req.params.id},
                    {
                        $pull: {
                            exercises: exercise
                        }
                    },
                    {new: true}
                )
                    .populate("exercises", "exerciseName")
                    .then(plan => {
                        res.json(plan)
                    })
                    .catch(err => console.log(err));
            } else {
                return res.status(404).json({exercise: "Exercise not found!"})
            }
        })
    })

module.exports = router;