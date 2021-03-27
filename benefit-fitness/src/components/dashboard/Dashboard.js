import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Button, Card, Col, Container, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <Container>

                <div style={{justifyContent: "center"}} className="valign-wrapper">
                    <div className="row">

                        <Container>

                            {/*Row containing welcoming and logout button*/}
                            <Row>
                                <div className="landing-copy col s12 center-align">
                                    <h4>
                                        <b>Hey there,</b> {user.username.split(" ")[0]}
                                        <p className="flow-text grey-text text-darken-1">
                                            You are logged into{" "}
                                            <span style={{ fontFamily: "monospace" }}>STURGEON</span>
                                        </p>
                                    </h4>
                                    <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onLogoutClick}
                                        className="text-light btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </Row>

                            {/*Row containing 1st set of Nav Cards    */}
                            <Row>
                                <Card style={{ width: '20rem', height: '15rem'}}>
                                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                                    <Card.Body>
                                        <Card.Title>EXERCISE LIBRARY</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/exercises">Go to Exercises</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '20rem', height: '15rem' }} className="ml-2">
                                    <Card.Body>
                                        <Card.Title>WORKOUT PLANS</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/plans">Go to Plans</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '20rem', height: '15rem' }} className="ml-2">
                                    <Card.Body>
                                        <Card.Title>MY PLANS</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/userplans">Go to My Plans</Button>
                                    </Card.Body>
                                </Card>
                            </Row>

                            {/*Row containing second set of Nav Cards*/}
                            <Row style={{justifyContent: "Center"}}>
                                <Card style={{ width: '20rem', height: '15rem'}}>
                                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                                    <Card.Body>
                                        <Card.Title>CONTACT US</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/contact">Go to Contact</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '20rem', height: '15rem' }} className="ml-2">
                                    <Card.Body>
                                        <Card.Title>MY PROFILE</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/profile">Go to My Profile</Button>
                                    </Card.Body>
                                </Card>
                                {/*<Card style={{ width: '18rem' }} className="bg-primary ml-2">*/}
                                {/*    <Card.Body>*/}
                                {/*        <Card.Title className="text-light">Card Title</Card.Title>*/}
                                {/*        <Card.Text className="text-light">*/}
                                {/*            Some quick example text to build on the card title and make up the bulk of*/}
                                {/*            the card's content.*/}
                                {/*        </Card.Text>*/}
                                {/*        <Button variant="light">Go somewhere</Button>*/}
                                {/*    </Card.Body>*/}
                                {/*</Card>*/}
                            </Row>

                        </Container>

                    </div>
                </div>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);