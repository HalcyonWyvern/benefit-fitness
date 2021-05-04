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
                tag: req.body.tag
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
            .populate({
                path: "exercises",
                populate: {
                    path: "exerciseID",
                    select: "exerciseName videoURL instructions equipment exerciseType"
                }
            })
            // .populate("exerciseID")
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
            .populate({
                path: "exercises",
                populate: {
                    path: "exerciseID",
                    select: "exerciseName videoURL instructions equipment exerciseType"

                }
            })
            // .populate("exerciseID", "exerciseName")
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

//@route PUT api/plans/:id
//@desc Updates plan information
router.put("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Plan.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(plan => {
            res.json(plan)
        })
        .catch(err => console.log(err))
    })

// @route PUT api/plans/add/:id
// @desc Add exercise to plan (The ID) by exercise name(req.body.exercise)
// @access Private
router.put("/add/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
        Exercise.findOne({_id: req.body.exercise}).then(exercise => {
            if(exercise) {
                Plan.findByIdAndUpdate(
                    {_id: req.params.id},
                    {
                        $push: {
                            exercises: {
                                exerciseID: exercise,
                                reps: req.body.reps,
                                sets: req.body.sets,
                                time: req.body.time
                            }
                        }
                    },
                    {new: true}
                )
                    .populate("exercise", "exerciseName")
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
// Fixed and working!
router.put("/remove/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
        Exercise.findOne({exerciseName: req.body.exerciseName}).then(exercise => {
            if(exercise) {
                Plan.findByIdAndUpdate(
                    {_id: req.params.id},
                    {
                        $pull: {
                            exercises: {
                                //_id: [req.body.id]
                                exerciseID: exercise
                            }
                        }
                    },
                    {new: true, safe: true}
                )
                    .then(plan => {
                        res.json(plan)
                    })
                    .catch(err => console.log(err))
            } else {
                return res.status(404).json({exerciseName: "Exercise not found!"})
            }
        })
    })

router.patch("/auto",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
        Exercise.findOne({exerciseName: req.body.exercise}).then(path => {
            if(path) {
                Plan.updateMany(
                    {},
                    {
                        $pull: {
                            exercises: {
                                //_id: [req.body.id]
                                exerciseID: path
                            }
                        }
                    },
                    {new: true, safe: true}
                )
                    .then(plan => {
                        res.json(plan)
                    })
                    .catch(err => console.log(err))
            } else {
                return res.status(404).json({exercise: "Exercise not found!"})
            }
        })
    })

module.exports = router;