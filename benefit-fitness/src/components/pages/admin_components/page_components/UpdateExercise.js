import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import axios from "axios";
import UpdateExerciseHelp from "../../page_components/HelpModals/UpdateExerciseHelp";

class UpdateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exerciseName: props.name || "",
            equipment: props.equipment || "",
            exerciseType: props.type || "",
            videoURL: props.video || "",
            instructions: props.instructions || "",
            sets: props.sets || "",
            reps: props.reps || "",
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

    valid = () => {
        let nameErr = "";
        let equipErr = "";
        let typeErr = "";
        let instructErr = "";


        if (!this.state.exerciseName) {
            nameErr = "Please name the exercise"
        }

        if (!this.state.equipment) {
            equipErr = "Please list the equipment required. If none is required, please specify that."
        }

        if (!this.state.exerciseType || this.state.exerciseType == "Please Choose the Exercise Type") {
            typeErr = "Please categorize the exercise."
        }

        if (!this.state.instructions) {
            instructErr = "Please fill out the instructions."
        }


        if (nameErr || equipErr || typeErr || instructErr) {
            this.setState({
                nameErr,
                equipErr,
                typeErr,
                instructErr
            });
            return false;
        } else {
            return true;
        }
    }


    onSubmit = e => {
        e.preventDefault();
        const isValid = this.valid();
        if(isValid) {
            const newRequest = {
                exerciseName: this.state.exerciseName,
                equipment: this.state.equipment,
                exerciseType: this.state.exerciseType,
                videoURL: this.state.videoURL,
                instructions: this.state.instructions,
                sets: this.state.sets,
                reps: this.state.reps
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
                instructions: "",
                sets: "",
                reps: "",
            })

            //Refreshes the profile page to show new data
            window.location.reload(false);
        }
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
                        <Row>
                            <Modal.Title>Update Exercise</Modal.Title>
                            <Col>
                                <UpdateExerciseHelp/>
                            </Col>
                        </Row>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <h2>Required Details</h2>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Exercise Name</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.exerciseName} name="exerciseName" id="exerciseName" type="box"/>
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.nameErr}
                            </div>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Equipment</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.equipment} name="equipment" id="equipment" type="box" placeholder="Equipment Needed"/>
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.equipErr}
                            </div>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Exercise Type</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.exerciseType} name="exerciseType" id="exerciseType" as="select">
                                    <option>Please Choose the Exercise Type</option>
                                    <option>Core Work</option>
                                    <option>Upper Body</option>
                                    <option>Lower Body</option>
                                    <option>Arms and Shoulders</option>
                                    <option>Compound Exercise</option>
                                </Form.Control>
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.typeErr}
                            </div>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Instructions</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.instructions} as="textarea" rows={4} name="instructions" id="instructions" placeholder="Exercise Instructions"/>
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.instructErr}
                            </div>

                            <h2>Optional Details</h2>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Video Link</Form.Label>
                                <Form.Control style={{fontSize: "1.15rem"}} onChange={this.onChange} value={this.state.videoURL} name="videoURL" id="videoURL" placeholder="Link to Exercise Video" type="box">
                                    {/*<option>Please Choose an Option</option>*/}
                                    {/*<option>Recreation</option>*/}
                                    {/*<option>Strength Training</option>*/}
                                    {/*<option>Physical Health/Wellness</option>*/}
                                </Form.Control>
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label style={{fontSize: "1.15rem"}}>Sets</Form.Label>
                                        <Form.Control
                                            style={{fontSize: "1.15rem"}}
                                            onChange={this.onChange}
                                            value={this.state.sets}
                                            name="sets"
                                            id="sets"
                                            as="select"
                                        >
                                            <option>Please Choose the Number of Sets</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label style={{fontSize: "1.15rem"}}>Reps</Form.Label>
                                        <Form.Control
                                            style={{fontSize: "1.15rem"}}
                                            onChange={this.onChange}
                                            value={this.state.reps}
                                            name="reps"
                                            id="reps"
                                            as="select"
                                        >
                                            <option>Please Choose the Number of Reps</option>
                                            <option>4</option>
                                            <option>6</option>
                                            <option>8</option>
                                            <option>10</option>
                                            <option>12</option>
                                            <option>16</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

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