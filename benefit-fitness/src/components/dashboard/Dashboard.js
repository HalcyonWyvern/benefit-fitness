import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Button, Card, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import UserDashHelp from "../pages/page_components/HelpModals/UserDashHelp";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    renderAdmin = () => {
        const {user} = this.props.auth;
        if(user.isAdmin) {
            return(<Card style={{width: '25rem', height: '15rem', fontSize: "1.25rem"}} className="bg-primary ml-2">
                <Card.Body>
                    <Card.Title className="text-light">Administration</Card.Title>
                    <Card.Text className="text-light">
                       View the administrator dashboard to manage the Sturgeon Web Application
                        all in one spot.
                    </Card.Text>
                    <Button variant="light" as={Link} to="/admin">Admin Dashboard</Button>
                </Card.Body>
            </Card>)
        }
    }

    render() {
        const { user } = this.props.auth;

        return (
            <Container style={{paddingBottom: "13rem"}}>
                <p>{' '}</p>
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
                                            <span style={{ fontFamily: "monospace" }}>BENEFIT FITNESS </span>
                                            <UserDashHelp/>
                                        </p>
                                    </h4>
                                    <button
                                        style={{fontSize: "1.25rem",
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
                            <Row style={{justifyContent: "Center"}}>
                                <Card style={{ width: '25rem', height: '15rem', fontSize: "1.25rem"}}>
                                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                                    <Card.Body>
                                        <Card.Title>EXERCISE LIBRARY</Card.Title>
                                        <Card.Text>
                                            View our library of handpicked exercises and see what
                                            we personally recommend our clients.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/exercises">Go to Exercises</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '25rem', height: '15rem', fontSize: "1.25rem"}} className="ml-2">
                                    <Card.Body>
                                        <Card.Title>WORKOUT PLANS</Card.Title>
                                        <Card.Text>
                                            View our collection of curated workout plans and find a system
                                            that works right for you.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/plans">Go to Plans</Button>
                                    </Card.Body>
                                </Card>
                                {/*<Card style={{ width: '20rem', height: '15rem' }} className="ml-2">
                                    <Card.Body>
                                        <Card.Title>MY PLANS</Card.Title>
                                        <Card.Text>
                                            View all of your saved plans and plans that have been assigned to you
                                            by our staff members.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/userplans">Go to My Plans</Button>
                                    </Card.Body>
                                </Card>*/}
                            </Row>

                            {/*Row containing second set of Nav Cards*/}
                            <Row style={{justifyContent: "Center"}}>
                                <Card style={{ width: '25rem', height: '15rem', fontSize: "1.25rem"}}>
                                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                                    <Card.Body>
                                        <Card.Title>CONTACT US</Card.Title>
                                        <Card.Text>
                                            Got an inquiry about training or need to get into contact with us? Send us
                                            a contact message!
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/contact">Go to Contact</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '25rem', height: '15rem', fontSize: "1.25rem" }} className="ml-2">
                                    <Card.Body>
                                        <Card.Title>MY PROFILE</Card.Title>
                                        <Card.Text>
                                            View and edit your profile information. Only our trainers will ever
                                            see the information you place inside.
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to="/profile">Go to My Profile</Button>
                                    </Card.Body>
                                </Card>


                                {this.renderAdmin()}

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