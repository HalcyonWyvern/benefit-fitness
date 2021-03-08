const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const NutritionTracker = require("../../models/userNutritionTrack");

//RESTful API below this
//I will probably completely axe this. They're too convoluted.

module.exports = router;