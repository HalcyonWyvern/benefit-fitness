import React, {Component} from "react";
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap";
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
        const {user} = this.props.auth;

        return (
            <Container>
                <Row>
                    <Col>
                        <p>{' '}</p>
                        <Jumbotron>
                            <h1>Contact Us!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
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