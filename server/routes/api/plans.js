const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");

const Plan = require("../../models/workoutPlan");

//RESTful API below this

router.get("/", (req, res) => {
    Plan.find()
        .sort({ date: -1 }) // descending order
        .then(items => res.json(items));
});

module.exports = router;