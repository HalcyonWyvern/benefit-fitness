import React, {Component} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";


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
        };
    }

    onSubmit = e => {
        const newRequest = {
            user: this.auth.user.id,
            phoneNumber: this.state.phoneNumber,
            requestType: this.state.requestType,
            requestedDate: this.state.requestedDate,
            comments: this.state.comments,
            contactMethod: this.state.contactMethod,
        };
       axios
           .post("/api/requests", newRequest)
           .then(res => console.log(res.data));
    }

    render() {
        const {user} = this.props.auth;
        return (
                <Container>
                    <Row>
                        <Col>
                            <p>{' '}</p>
                            <h2>Contact Us!</h2>
                            <h6>Please Provide us with some basic information and we will reach out to you shortly.</h6>

                        </Col>
                    </Row>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control id="phoneNumber" type="phoneNumber" placeholder="Phone"/>

                            <Form.Text className="text-muted">
                                We'll never share your phone or email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Request Type</Form.Label>
                            <Form.Control as="select" multiple id="requestType">
                                <option>Fitness Inquiry</option>
                                <option>Request Exercise Plan</option>
                                <option>Group Inquiry</option>
                                <option>Speak to a Trainer</option>
                                <option>Misc. Questions</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Contact Method</Form.Label>
                            <Form.Control as="select" id="contactMethod">
                                <option>Phone</option>
                                <option>Email</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Details</Form.Label>
                            <Form.Control id="comments" as="textarea" rows={3}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Requested Date</Form.Label>
                            <Form.Control id="requestedDate" type="date" placeholder="Date"/>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
        );
    }
}

Contact.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Contact);