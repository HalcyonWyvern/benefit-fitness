const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send("This is the server. How'd you get over here? Port 3000 is what you want!");
});

module.exports = router;