import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            bio: "",
            height: "",
            weight: "",
            exerciseGoal: ""
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
                this.setState({
                    user: user,
                    bio: profile.bio,
                    height: profile.height,
                    weight: profile.weight,
                    exerciseGoal: profile.exerciseGoal
                })
                console.log(res.data);
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