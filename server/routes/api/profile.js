const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const Profile = require("../../models/userProfile");
const User = require("../../models/userAccount");
const isAdmin = require("../../middlewares/isAdmin");

// @route POST api/profile/create
// @desc Create profile for user (Done only once per user)
// @access Private
router.post("/create/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if (user) {
            Profile.findOne({user: user}).then(profile => {
                if (profile) {
                    return res.status(404).json({user: "User Profile already exists!"})
                } else {
                    const newProfile = new Profile({
                        user: user,
                    })

                    newProfile
                        .save()
                        .then(profile => res.json(profile))
                        .catch(err => console.log(err));
                }
            })
        } else {
            return res.status(404).json({ username: "User not found"})
        }
    })
});

//@route GET api/profile/:username
//@desc Get a user profile by their username
//@access Private
router.get("/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findOne({ username: req.params.username }).then(user => {
        if(user) {
            Profile.find({user: user})
                .populate("user", "username email city state address zip")
                .then(profile => res.json(profile))
        } else {
            res.status(404).json({user: "Username not found"})
        }
    })
})


//@route PUT api/profile/:username
//@desc Update profile by ID
//@access Private
router.put("/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        if (user) {
            Profile.findOneAndUpdate(
                {user: user},
                req.body,
                {new: true}
            )
                .then(profile => {
                    res.json(profile)
                })
                .catch(err => console.log(err));
        }
    })
})

module.exports = router;