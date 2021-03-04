const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

// Load User model from models
const User = require("../../models/userAccount");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //checks if user is in use before going to check email
    User.findOne({ username: req.body.username }).then(username => {
        if (username) {
            return res.status(400).json({username: "Username in use"});
        }
    });

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already in use" });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;

// Find user by username
    User.findOne({ username }).then(user => {

        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernotfound: "User not found" });
        }

// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user._id,
                    username: user.username,
                    isAdmin: user.isAdmin
                };

// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// Sorry, Usernames will never be changeable since they're UIDs
// @route PUT api/users/:id
// @desc Update an existing User account's information
// @access Private
router.put('/:id',
    passport.authenticate("jwt", { session: false }),
   (req, res) => {
        User.findByIdAndUpdate(
            { _id: req.params.id },
             req.body,
            { new : true }
        )
            .then(user => {
                res.json(user);
            })
            .catch(err => console.log(err));
});


// @route GET api/users/:id
// @desc Get USER by _id
// @access Private
router.get('/:id', (req, res) => {

});

//@route GET api/users
//@desc list all USERS
//@access Private

module.exports = router;
