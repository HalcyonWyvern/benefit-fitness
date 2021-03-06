import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
import RegisterHelp from "../pages/page_components/HelpModals/RegisterHelp";


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div style={{paddingBottom: "15rem"}} className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            Home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> Below <RegisterHelp/>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s5">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.username
                                    })}
                                />
                                <label htmlFor="username">Username</label>
                                <span className="red-text">{errors.username}</span>
                            </div>
                            <div className="input-field col s5">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s5">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    error={errors.firstName}
                                    id="firstName"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.firstName
                                    })}
                                />
                                <label htmlFor="firstName">First Name</label>
                                <span className="red-text">{errors.firstName}</span>
                            </div>
                            <div className="input-field col s5">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    error={errors.lastName}
                                    id="lastName"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.lastName
                                    })}
                                />
                                <label htmlFor="lastName">Last Name</label>
                                <span className="red-text">{errors.lastName}</span>
                            </div>
                            <div className="input-field col s10">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    error={errors.address}
                                    id="address"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.address
                                    })}
                                />
                                <label htmlFor="address">Address</label>
                                <span className="red-text">{errors.address}</span>
                            </div>
                            <div className="input-field col s5">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.city}
                                    error={errors.city}
                                    id="city"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.city
                                    })}
                                />
                                <label htmlFor="city">City</label>
                                <span className="red-text">{errors.city}</span>
                            </div>
                            <div className="input-field col s2">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.state}
                                    error={errors.state}
                                    id="state"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.state
                                    })}
                                />
                                <label htmlFor="address">State</label>
                                <span className="red-text">{errors.state}</span>
                            </div>
                            <div className="input-field col s3">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.zip}
                                    error={errors.zip}
                                    id="zip"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.zip
                                    })}
                                />
                                <label htmlFor="address">ZIP</label>
                                <span className="red-text">{errors.zip}</span>
                            </div>
                            <div className="input-field col s8">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s8">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    registerProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));