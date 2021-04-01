const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const Exercise = require("../../models/exercises");

//NOTE AdminDash only access to ALL APIs here
//Please ensure they all go through the authorization middleware
const isAdmin = require("../../middlewares/isAdmin");

// @route POST api/exercises/
// @desc Add exercise to the database, USERS can do this too
// @access Public
router.post("/",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
        Exercise.findOne({ exerciseName: req.body.exerciseName }).then(exercise => {
            if (exercise) {
                return res.status(400).json({exercise: "Exercise Already Created. Please Delete or Update instead!"});
            } else {
                const newExercise = new Exercise({
                    exerciseName: req.body.exerciseName,
                    equipment: req.body.equipment,
                    sets: req.body.sets,
                    reps: req.body.reps,
                    exerciseType: req.body.exerciseType,
                    videoURL: req.body.videoURL,
                    instructions: req.body.instructions
                });

                newExercise
                    .save()
                    .then(exercise => res.json(exercise))
                    .catch(err => console.log(err));
            }
        });
    });

//@route GET api/exercises
//@desc Get list of all exercises
//@access Private
router.get("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Exercise.find({ })
        .sort({ exerciseName: -1 })
        .then((exercise) => {res.json(exercise);
        })
        .catch(err => console.log(err));
});

//@route GET api/exercises/:id
//@desc Get single exercise by ID
//@access Private
router.get("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Exercise.findById({ _id: req.params.id })
        .then(exercise => res.json(exercise));
});

//@route PUT api/exercises/:id
//@desc Update single exercise by ID
//@access Private
router.put("/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Exercise.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    )
        .then(exercise => {
            res.json(exercise);
        })
        .catch(err => console.log(err));
})

//@route DELETE api/exercises/:id
//@desc Delete exercise by ID
//@access Private
router.delete("/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Exercise.findByIdAndDelete({ _id: req.params.id })
        .then(exercise => {
            res.json({ exercise, success: true })
        })
        .catch(err => {
            res.status(404).json({ success: false })
            console.log(err)
        })
});


module.exports = router;