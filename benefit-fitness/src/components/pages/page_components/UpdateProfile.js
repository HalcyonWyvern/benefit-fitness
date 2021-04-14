//Modal button for updating the user profile
import {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            height: "",
            weight: "",
            exerciseGoal: "",
            isOpen: false
        }
    }

    showModal = () => {
        this.setState({
            isOpen: true
        })
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const {user} = this.props.auth;
        const newRequest = {
            bio: this.state.bio,
            height: this.state.height,
            weight: this.state.weight,
            exerciseGoal: this.state.exerciseGoal
        }
        console.log(newRequest);

        axios
            .put('/api/profile/' + user.username, newRequest)
            .then(res => console.log(res.data));

        this.setState({
            isOpen: false,
            bio: "",
            height: "",
            weight: "",
            exerciseGoal: "",
        })

        //Refreshes the profile page to show new data
        window.location.reload(false);
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    Update Profile
                </Button>
                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update My Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.bio} name="bio" id="bio" as="textarea"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Height</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.height} name="height" id="height" placeholder="Height in inches"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.weight} name="weight" id="weight" placeholder="Weight in lbs"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Exercise Goal</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.exerciseGoal} name="exerciseGoal" id="exerciseGoal" as="select">
                                    <option>Please Choose an Option</option>
                                    <option>Recreation</option>
                                    <option>Strength Training</option>
                                    <option>Physical Health/Wellness</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }


}

UpdateProfile.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(UpdateProfile);