import React, {Component} from "react";
import {Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";
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
                                <h6>We're more than willing to hear your personal requests.</h6>
                                Please fill out the form below and one of our team members will reach out to you within
                                five to ten business days.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control id="phoneNumber" type="phoneNumber" placeholder="Phone" />

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
                        <Form.Label>Comments</Form.Label>
                        <Form.Control id="comments" as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Requested Date</Form.Label>
                        <Form.Control id="requestedDate" type="date" placeholder="Date" />
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