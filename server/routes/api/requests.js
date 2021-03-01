const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Request = require("../../models/workoutRequest");

//RESTful API below this

module.exports = router;