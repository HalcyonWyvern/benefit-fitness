import React, {Component} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UserPlans extends Component {

    componentDidMount() {
        this.getPlan();
    }

    getPlan() {
        const {user} = this.props.auth;
        axios.get('/api/userplan/user/' + user.username)
            .then(res => {
                const uPlans = res.data;
                this.setState({
                    userPlan: uPlans
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

            </Container>
        );
    }
}

UserPlans.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(UserPlans);