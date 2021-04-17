import React, {Component} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UserPlans extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            plan: "",
            trainerAdvice: "",
            thePlans: []
        }
    }

    componentDidMount() {
        this.getPlan();
    }

    getPlan = () => {
        const {user} = this.props.auth;
        axios.get('/api/userplan/user/' + user.username)
            .then(res => {
                const uPlans = res.data;
                this.setState({thePlans: uPlans})
                console.log(uPlans);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // displayUserPlans = (userPlan) => {
    //     // if (!exercisePlans.length) return null;
    //     const {user} = this.props.auth;
    //     let username = user.username;
    //     let x = username.charAt(0).toUpperCase() + username.slice(1);
    //
    //
    //     return (
    //         <Container>
    //
    //             <h3>{x}'s Plans</h3>
    //             {this.state.userPlan.map(uPlan =>
    //                 <div key={uPlan._id}>
    //                     <p>User: {uPlan.user}</p>
    //                     <p>{uPlan.plan}</p>
    //                     <p>{uPlan.trainerAdvice}</p>
    //                 </div>
    //             )}
    //
    //         </Container>
    //     );
    // };

    render() {
        const {user} = this.props.auth;
        let username = user.username;
        let x = username.charAt(0).toUpperCase() + username.slice(1);

        return (

            <Container>
                <h3>{x}'s Plans</h3>
                {this.state.thePlans.map(uPlan =>
                    // <Form>
                    //     <Row>
                    //         <Col>
                    //             <Form.Group>
                    //                 <Form.Label>My Bio</Form.Label>
                    //                 <Form.Control value={uPlan.user.username} id="bio" as="textarea" disabled placeholder="Bio not created."/>
                    //             </Form.Group>
                    //         </Col>
                    //     </Row>
                    // </Form>
                    <div key={uPlan._id}>
                        {/*{uPlan.user.map(user =>*/}
                        {/*<p>User: {user.user}</p>*/}
                        {/*)}*/}

                        <Row>
                        {/*<p>Plan: {uPlan.plan.name}</p>*/}
                        <p></p>
                        </Row>
                        {/*<p>{uPlan.plan}</p>*/}
                        {/*<p>{uPlan.trainerAdvice}</p>*/}
                    </div>
                )}

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