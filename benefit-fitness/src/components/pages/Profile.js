import React, {Component} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import UpdateProfile from "./page_components/UpdateProfile"
import ProfileUpdateAcc from "./page_components/ProfileUpdateAcc";
import {Link} from "react-router-dom";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            bio: "",
            height: "",
            weight: "",
            exerciseGoal: "",
            profiles: []
        }
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        const {user} = this.props.auth;
        axios.get('/api/profile/'+ user.username)
            .then(res => {
                const profile = res.data
                this.setState({profiles: profile})
                console.log(profile);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const {user} = this.props.auth;
        let username = user.username;
        let x = username.charAt(0).toUpperCase() + username.slice(1);
        return (
            <Container>
                <p>{' '}</p>
                <Row>

                </Row>
                <Row>
                    <Col>
                        <h2>{x}'s Profile</h2>
                        <h6>Please ensure your information is up-to-date for our trainers to reference.</h6>
                    </Col>

                    <Col xs={6} md={2}>
                        <p>{' '}</p>
                        {this.state.profiles.map(profile =>
                        <UpdateProfile
                            bio={profile.bio}
                            height={profile.height}
                            weight={profile.weight}
                            goal={profile.exerciseGoal}
                        />
                        )}
                    </Col>
                </Row>

                {this.state.profiles.map(profile =>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>My Bio</Form.Label>
                                <Form.Control value={profile.bio} id="bio" as="textarea" disabled placeholder="Bio not created."/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Height in Inches</Form.Label>
                                <Form.Control value={profile.height} id="height" disabled type="box" placeholder="None Given"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>My Weight in Pounds</Form.Label>
                                <Form.Control value={profile.weight} id="weight" disabled type="box" placeholder="None Given"/>
                            </Form.Group>
                        </Col>
                        <Col md="8">
                            <Form.Group>
                                <Form.Label>My Goal</Form.Label>
                                <Form.Control value={profile.exerciseGoal} id="exerciseGoal" disabled type="box" placeholder="None specified"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <h2>My Account Information</h2>
                            <h6>Please use the <Link to="/contact">contact form</Link> if you need your email address changed.</h6>
                        </Col>
                        <Col xs={6} md={2}>
                            <p>{' '}</p>
                            <ProfileUpdateAcc
                                address={profile.user.address}
                                city={profile.user.city}
                                state={profile.user.state}
                                zip={profile.user.zip}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={profile.user.email} id="email" disabled type="box" placeholder="None specified"/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={profile.user.address} id="address" disabled type="box"/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control value={profile.user.city} id="city" disabled type="box"/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control value={profile.user.state} id="state" disabled type="box"/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Zip</Form.Label>
                            <Form.Control value={profile.user.zip} id="zip" disabled type="box"/>
                        </Form.Group>
                        </Col>
                    </Row>
                </Form>
                )}
            </Container>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Profile);