import React, {Component} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import UpdateProfile from "./page_components/UpdateProfile"

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
        return (
            <Container>
                <p>{' '}</p>
                <Row>
                    <Col>
                        <h2>My Profile</h2>
                        <h6>Please ensure your information is up-to-date for our trainers to reference.</h6>
                    </Col>
                    <Col xs={6} md={2}>
                        <p>{' '}</p>
                        <UpdateProfile/>
                    </Col>
                </Row>
                <Row>
                    {this.state.profiles.map(profile =>
                        <Col>
                            <p>Bio: {profile.bio}</p>
                            <p>Height: {profile.height}</p>
                            <p>Weight: {profile.weight}</p>
                            <p>Goal: {profile.exerciseGoal}</p>
                            <p>City: {profile.user.city}</p>
                            <p>State: {profile.user.state}</p>
                            <p>Email: {profile.user.email}</p>
                        </Col>
                    )}
                </Row>
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