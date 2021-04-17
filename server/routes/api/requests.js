const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const Request = require("../../models/workoutRequest");
const User = require("../../models/userAccount");
const isAdmin = require("../../middlewares/isAdmin");

// @route POST api/requests
// @desc Create a new request
// @access Private [User+]
router.post("/", (req,res) => {
    User.findOne({ username: req.body.user }).then(user => {
        const newRequest = new Request({
            user: user,
            phoneNumber: req.body.phoneNumber,
            requestType: req.body.requestType,
            requestedDate: req.body.requestedDate,
            comments: req.body.comments,
            contactMethod: req.body.contactMethod
        });

        newRequest
            .save()
            .then(request => res.json(request))
            .catch(err => console.log(err));
    })
});


// @route GET api/requests
// @desc Get all user requests
// @access Private [User+]
router.get("/",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Request.find()
        .sort({ requestedDate: -1 })
        .populate({path: "user"})
        .then(request => res.json(request))
});

// @route GET api/requests/:id
// @desc Get request by _id
// @access Private
router.get("/user/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Request.findById({ _id: req.params.id })
        .populate("user")
        .then(request => res.json(request))
});

// @route GET api/requests/user/
// @desc Get all requests from one user by inputting their username
// @access Private
router.get("/user",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) =>{
    User.findOne({ username: req.body.username }).then(user => {
        Request.find({ user: user})
            .populate("user", "email")
            .then(request => res.json(request))
    })
});

// @route PUT api/requests/:id
// @desc Update request by _id
// Most likely unused due to how requests are handled in UI
// @access Private
router.put("/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Request.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    )
        .then(request => {
            res.json(request);
        })
        .catch(err => console.log(err));
});

// @route DELETE api/requests/:id
// @desc Delete request by _id
// @access Private
router.delete("/:id",
    [passport.authenticate("jwt", { session: false }), isAdmin],
    (req, res) => {
    Request.findByIdAndDelete({ _id: req.params.id })
        .then(request => {
            res.json({ request, success: true})
        })
        .catch(err => {
            res.status(404).json({ success: false })
            console.log(err)
        })
});

module.exports = router;