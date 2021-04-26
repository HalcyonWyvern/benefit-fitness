import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

class UpdateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exerciseName: props.name || "",
            equipment: props.equipment || "",
            exerciseType: props.type || "",
            videoURL: props.video || "",
            instructions: props.instructions || "",
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
        const newRequest = {
            exerciseName: this.state.exerciseName,
            equipment: this.state.equipment,
            exerciseType: this.state.exerciseType,
            videoURL: this.state.videoURL,
            instructions: this.state.instructions
        }
        console.log(newRequest);

        axios
            .put('/api/exercises/' + this.props.exerciseID, newRequest)
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
                <Button variant="outline-success" className="ml-2" onClick={this.showModal}>
                    Update Exercise
                </Button>
                <Modal size="xl" show={this.state.isOpen} onHide={this.hideModal}
                       style={{
                           position: "absolute",
                           left: "50%",
                           top: "45%",
                           transform: "translate(-50%, -50%)",
                           background: 0,
                           boxShadow: "none",
                       }}
                       scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Exercise</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Exercise Name</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.exerciseName} name="exerciseName" id="exerciseName" type="box"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Equipment</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.equipment} name="equipment" id="equipment" type="box" placeholder="Equipment Needed"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Exercise Type</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.exerciseType} name="exerciseType" id="exerciseType" as="select">
                                    <option>Please Select an Exercise Type</option>
                                    <option>Please Choose the Exercise Type</option>
                                    <option>Core Work</option>
                                    <option>Upper Body</option>
                                    <option>Lower Body</option>
                                    <option>Arms and Shoulders</option>
                                    <option>Compound Exercise</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Video Link</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.videoURL} name="videoURL" id="videoURL" placeholder="Link to Exercise Video">
                                    {/*<option>Please Choose an Option</option>*/}
                                    {/*<option>Recreation</option>*/}
                                    {/*<option>Strength Training</option>*/}
                                    {/*<option>Physical Health/Wellness</option>*/}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Instructions</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.instructions} as="textarea" rows={4} name="instructions" id="instructions" placeholder="Exercise Instructions"/>
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