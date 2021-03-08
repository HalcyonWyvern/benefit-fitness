const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Profile = require("../../models/userProfile");

// @route POST api/profile/
// @desc Add exercise to the database
// @access Private


//@route GET api/profile
//@desc List all user profiles
//@access Private


//@route GET api/profile/:id
//@desc Get a user profile by ID
//@access Private


//@route PUT api/profile/:id
//@desc Update profile by ID
//@access Private


//@route DELETE api/profile/:id
//@desc Delete profile entry by ID
//@access Private

module.exports = router;