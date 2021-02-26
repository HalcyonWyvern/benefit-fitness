const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

// Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.zip = !isEmpty(data.zip) ? data.zip : "";


// information checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "username field is required";
    }
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Field is required"
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Field is required"
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Field is required"
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = "Field is required"
    }
    if (Validator.isEmpty(data.state)) {
        errors.state = "Field is required"
    }
    if (Validator.isEmpty(data.zip)) {
        errors.zip = "Field is required"
    }

// Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

// Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};