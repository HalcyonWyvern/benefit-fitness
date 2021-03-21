import React, {Component} from "react";
import {Container} from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendRequest } from "../../actions/Contact/contactActions"


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            phoneNumber: "",
            requestType: "",
            requestedDate: "",
            comments: "",
            contactMethod: "",
            errors: {}
        };
    }

    onSubmit = e => {
        const newRequest = {
            user: this.state.user,
            phoneNumber: this.state.phoneNumber,
            requestType: this.state.requestType,
            requestedDate: this.state.requestedDate,
            comments: this.state.comments,
            contactMethod: this.state.contactMethod,
        };
        this.props.sendRequest(newRequest)
    }

    render() {
        const { user } = this.props.auth;
        return (
            <Container fluid="lg">

            </Container>
        );
    }
}

Contact.propTypes = {
    sendRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { sendRequest }
)(Contact);