const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const WeightTracker = require("../../models/userWeightTrack");

//RESTful API below this
//Once again, fuck these utils. I don't want to go through a billion different authentication routes.

module.exports = router;