const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const UserPlan = require("../../models/userPlan");
const User = require("../../models/userAccount");
const Plan = require("../../models/workoutPlan");

const isAdmin = require("../../middlewares/isAdmin");

// @route POST /api/userplan
// @desc Create a new plan for a USER
// @access Private
router.post("/",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if(user) {
            Plan.findOne({name: req.body.plan}).then(plan => {
                if(plan) {
                    const newUPLan = new UserPlan({
                        user: user,
                        plan: plan,
                        trainerAdvice: req.body.trainerAdvice
                    })
                    newUPLan
                        .save()
                        .then(userplan => {
                            res.json(userplan)
                        })
                        .catch(err => console.log(err))
                } else {
                    return res.status(404).json({plan: "Exercise plan not found."})
                }
            })
        } else {
            return res.status(404).json({username: "Username not found."})
        }
    })
})

// @route GET /api/userplan/user/:username
// @desc Get all plans assigned to a user by their username
// @access Private
router.get("/user/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        if(user) {
            UserPlan.find({user: user})
                .populate("user", "username")
                .populate("plan", "name")
                .then(plan => {
                    res.json(plan)
            });
        } else {
            return res.status(404).json({user: "Username not found."})
        }
    })
})

// @route GET /api/userplan/:id
// @desc Get a single user plan by its ID and return it
// @access Private
router.get("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    UserPlan.findOne({_id: req.params.id})
        .populate("user", "username")
        .populate("plan", "name")
        .then(uplan => {
        if(uplan) {
            res.json(uplan)
        } else {
            return res.status(404).json({_id: "User Plan ID not found"})
        }
    })
})

// @route DELETE /api/userplan/:id
// @desc Delete a user plan by it's id
// @access Private
router.delete("/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    UserPlan.findByIdAndDelete({_id: req.params.id})
        .then(uplan => {
            if(uplan) {
                res.json({uplan, success: true})
            } else {
                return res.status(404).json({uplan: "User Plan Not Found"})
            }
        })
        .catch(err => {
            res.status(404).json({success: false})
            console.log(err)
        })
})


module.exports = router;