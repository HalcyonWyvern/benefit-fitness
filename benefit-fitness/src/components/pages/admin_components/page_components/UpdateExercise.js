import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

class UpdateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exerciseName: "",
            equipment: "",
            exerciseType: "",
            videoURL: "",
            instructions: "",
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
    }

    onSubmit = e => {
        e.preventDefault();
        const {id} = this.props.auth;
        const newRequest = {
            exerciseName: this.state.exerciseName,
            equipment: this.state.equipment,
            exerciseType: this.state.exerciseType,
            videoURL: this.state.videoURL,
            instructions: this.state.instructions
        }
        console.log(newRequest);

        axios
            .put('/api/exercises/' + id._id, newRequest)
            // .put('/api/exercises/' , newRequest)

            .then(res => console.log(res.data));

        this.setState({
            isOpen: false,
            exerciseName: "",
            equipment: "",
            exerciseType: "",
            videoURL: "",
            instructions: ""
        })

        //Refreshes the profile page to show new data
        window.location.reload(false);
    }

    render() {
        return (
            <>
                <Button variant="success" className="ml-2" onClick={this.showModal}>
                    Update Exercise
                </Button>
                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Exercise</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Exercise Name</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.exerciseName} name="exerciseName" id="exerciseName" as="textarea"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Equipment</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.equipment} name="equipment" id="equipment" placeholder="Equipment Needed"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Exercise Type</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.exerciseType} name="exerciseType" id="exerciseType" placeholder="Type of Exercise"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Video Link</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.videoURL} name="videoURL" id="videoURL" placeholder="Link to Exercise Video">
                                    {/*<option>Please Choose an Option</option>*/}
                                    {/*<option>Recreation</option>*/}
                                    {/*<option>Strength Training</option>*/}
                                    {/*<option>Physical Health/Wellness</option>*/}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Instructions</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.instructions} name="instructions" id="instructions" placeholder="Exercise Instructions"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
UpdateExercise.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(UpdateExercise);