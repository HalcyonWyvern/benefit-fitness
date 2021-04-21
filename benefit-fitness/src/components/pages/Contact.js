import React, {Component} from "react";
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import { Alert } from "reactstrap";

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
            visible: false
        };
    }

    valid = () => {
        let phoneErr = "";

        let reqTypeErr = "";
        let methodErr = "";
        let commentErr = "";

        if (!this.state.phoneNumber) {
            phoneErr = "Phone number cannot be blank."
        }

        if (!this.state.requestType) {
            reqTypeErr = "Please choose the request type."
        }

        if (!this.state.comments) {
            commentErr = "Please fill out the comment section."
        }

        if (!this.state.contactMethod) {
            methodErr = "Please select a contact method."
        }

        if(this.state.phoneNumber.length !== 10) {
            phoneErr = "Please enter a valid ten digit phone number."
        }

        if (phoneErr || reqTypeErr || methodErr || commentErr) {
            this.setState({
                phoneErr,
                reqTypeErr,
                methodErr,
                commentErr
            });
            return false;
        } else {
            return true;
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onDismiss = () => this.setState({ visible: false });

    onSubmit = e => {
        e.preventDefault();
        const {user} = this.props.auth;
        const isValid = this.valid();
        if (isValid) {
            const newRequest = {
                user: user.username.split(" ")[0],
                phoneNumber: this.state.phoneNumber,
                requestType: this.state.requestType,
                requestedDate: Date.now(),
                comments: this.state.comments,
                contactMethod: this.state.contactMethod,
            };
            console.log(newRequest);

            axios
                .post("/api/requests", newRequest)
                .then(res => console.log(res.data));

            this.setState({
                visible: true,
            });
            this.setState({
                user: "",
                phoneNumber: "",
                requestType: "",
                requestedDate: "",
                comments: "",
                contactMethod: "",
                phoneErr: "",
                reqTypeErr: "",
                methodErr: "",
                commentErr: "",
            })
        }
    }

    render() {
        const date = new Date();
        const {user} = this.props.auth;
        return (
                <Container style={{paddingBottom: "10rem", paddingTop: "2.5rem"}}>

                   {/* <Row>
                        <Col>
                            <h2>Benefit Fitness Contact Information</h2>
                            <p style={{fontSize: "1.5rem"}}>Benefit Fitness</p>
                        </Col>

                    </Row>*/}


                    <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                        <h4>Thank you!</h4>Your request has been sent, you should receive a message from us
                        within 5-10 business days!
                    </Alert>
                    <Row>
                        <Col>
                            <h2>Contact Us!</h2>
                            <p style={{fontSize: "1.30rem"}}>Please provide us with some basic information in this form and we will reach out to you shortly.</p>

                        </Col>
                    </Row>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label style={{fontSize: "1.25rem"}}>Username</Form.Label>
                            <Form.Control style={{fontSize: "1.25rem"}} onChange={this.onChange} value={user.username.split(" ")[0]} disabled name="user" id="user" type="box"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize: "1.25rem"}}>Today's Date</Form.Label>
                            <Form.Control style={{fontSize: "1.25rem"}} onChange={this.onChange} value={date.toDateString()} id="requestedDate"  placeholder="Date" disabled type="box"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize: "1.25rem"}}>Phone Number</Form.Label>
                            <Form.Control style={{fontSize: "1.25rem"}} onChange={this.onChange} value={this.state.phoneNumber} name="phoneNumber" id="phoneNumber" type="box" placeholder="Phone"/>

                            <Form.Text style={{fontSize: "1.15rem"}} className="text-muted">
                                We'll never share your phone or email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <div style={{ fontSize: 14, color: "red" }}>
                            {this.state.phoneErr}
                        </div>

                        <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label style={{fontSize: "1.25rem"}}>Request Type</Form.Label>
                            <Form.Control style={{fontSize: "1.25rem"}} onChange={this.onChange} value={this.state.requestType} as="select" id="requestType">
                                <option>Please Choose an Option</option>
                                <option>Fitness Inquiry</option>
                                <option>Online Training</option>
                                <option>More Information on Services</option>
                                <option>Speak to a Trainer</option>
                                <option>Account Update</option>
                                <option>Misc. Questions</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                            <Form.Label style={{fontSize: "1.25rem"}}>Contact Method</Form.Label>
                            <Form.Control style={{fontSize: "1.25rem"}} onChange={this.onChange} value={this.state.contactMethod} as="select" id="contactMethod">
                                <option>Please Choose an Option</option>
                                <option>Phone</option>
                                <option>Email</option>
                            </Form.Control>
                        </Form.Group>

                        </Form.Row>
                        <Row>
                            <Col><div style={{ fontSize: 14, color: "red" }}>
                                {this.state.reqTypeErr}
                            </div></Col>
                            <Col><div style={{ fontSize: 14, color: "red" }}>
                                {this.state.methodErr}
                            </div></Col>
                        </Row>

                        <Form.Group>
                            <Form.Label style={{fontSize: "1.25rem"}}>Details</Form.Label>
                            <Form.Control style={{fontSize: "1.25rem"}} onChange={this.onChange} value={this.state.comments} id="comments" as="textarea" rows={3} placeholder="Please tell us more about how we can help you."/>
                        </Form.Group>
                        <div style={{ fontSize: 14, color: "red" }}>
                            {this.state.commentErr}
                        </div>


                        <p>{' '}</p>
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