const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const db = require('./config/keys');
const passport = require("passport");
const base = require("./routes/base.route");

//APIs because I didn't use an index lol
const users = require("./routes/api/users");
const requests = require("./routes/api/requests");
const plans = require("./routes/api/plans");
const exercises = require("./routes/api/exercises");
const userplan = require("./routes/api/userplan");
const weight = require("./routes/api/weight");
const profile = require("./routes/api/profile");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//MongoDB Connection
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Successfully connected to the MongoDB database!");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport") (passport);

// Routes below this
app.use("/api/users", users);
app.use("/api/requests", requests);
app.use("/api/plans", plans);
app.use("/api/exercises", exercises);
app.use("/api/userplan", userplan);
app.use("/api/weight", weight);
app.use("/api/profile", profile);
app.use("/", base);

// Port env is present on stuff like Heroku. OR statement attempts to use this first.
const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function () {
    console.info(`Server is up and running on port ${port}`)
});