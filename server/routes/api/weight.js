const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const WeightTracker = require("../../models/userWeightTrack");
const User = require("../../models/userAccount");

const isAdmin = require("../../middlewares/isAdmin");

// @route POST api/weight/create/:username
// @desc Create weight tracker for user (Done only once per user)
// @access Private
router.post("/create/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findOne({username : req.params.username}).then(user => {
        if(user) {
            WeightTracker.findOne({user: user}).then(weight => {
                if(weight) {
                    return res.status(404).json({weightTracker: "User is already registered for Weight Tracking."})
                } else {
                    const newTracker = new WeightTracker({
                        user: user,
                        weightTrack: [{
                            weight: req.body.weight
                        }]
                    })

                    newTracker
                        .save()
                        .then(weight => res.json(weight))
                        .catch(err => console.log(err));
                }
            })
        } else {
            return res.status(404).json({username: "User not found."})
        }
    })
});

// @route GET api/weight/:username
// @desc GET weight information for user
// @access Private
router.get("/:username",
    passport.authenticate("jwt", { session: false }),
    (req,res) => {
    User.findOne({username: req.params.username}).then(user =>{
        if(user) {
            WeightTracker.findOne({user: user})
                .populate("user", "firstName lastName")
                .then(weight => {
                    res.json(weight)
                });
        } else {
            res.status(404).json({user: "Username not found"})
        }
    })
})

// @route PUT api/weight/:username
// @desc Add Weight to weight tracker
// @access Private
router.put("/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        if (user) {
            WeightTracker.findOne({user: user}).then(weight => {
                weight.weightTrack.push({
                    weight: req.body.weight,
                    date: Date.now()
                })
                weight
                    .save()
                    .then(weight => {
                        res.json(weight);
                    })
                    .catch(err => console.log(err));
            })
        } else {
            return res.status(404).json({username: "User not found"})
        }
    })
});

// @route DELETE api/weight/:id
// @desc Delete weight entry in user's weight tracker
// @access Private
// TODO
// Not really necessary unless we want it
// Also a really big pain in the ass to deal with.

module.exports = router;