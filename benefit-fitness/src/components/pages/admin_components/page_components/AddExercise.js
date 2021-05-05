import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Modal} from "react-bootstrap";
import AddExerciseHelp from "../../page_components/HelpModals/AddExerciseHelp";


class AddExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            exerciseName: "",
            equipment: "",
            sets: "",
            reps: "",
            exerciseType: "",
            videoURL: "",
            instructions: ""
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

        if (!this.state.exerciseType || this.state.exerciseType === "Please Choose the Exercise Type") {
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
            const newExercise = {
                exerciseName: this.state.exerciseName,
                equipment: this.state.equipment,
                sets: this.state.sets,
                reps: this.state.reps,
                exerciseType: this.state.exerciseType,
                videoURL: this.state.videoURL,
                instructions: this.state.instructions
            }
            console.log(newExercise);

            axios.post("api/exercises/", newExercise)
                .then(res => {
                    console.log(res.data);
                })

            this.setState({
                exerciseName: "",
                equipment: "",
                sets: "",
                reps: "",
                exerciseType: "",
                videoURL: "",
                instructions: "",
                isOpen: false
            })

            window.location.reload(false);
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    New Exercise
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
                        <Modal.Title>Create a new Exercise entry.</Modal.Title>
                        <Col sm={1}>
                        <AddExerciseHelp/>
                        </Col>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <h4>Required Details</h4>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Exercise Name</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.exerciseName}
                                    name="exerciseName"
                                    id="exerciseName"
                                    placeholder="Exercise"
                                    type="Box"
                                />
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.nameErr}
                            </div>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Required Equipment</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.equipment}
                                    name="equipment"
                                    id="equipment"
                                    placeholder="e.g. dumbbells, kettlebells, barbells"
                                    type="Box"
                                />
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.equipErr}
                            </div>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Exercise Type</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.exerciseType}
                                    name="exerciseType"
                                    id="exerciseType"
                                    as="select"
                                >
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
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.instructions}
                                    name="instructions"
                                    id="instructions"
                                    as="textarea"
                                    aria-describedby="textHelpBlock"
                                />
                                <Form.Text id="textHelpBlock" muted style={{fontSize: "1.15rem"}}>
                                    Please thoroughly describe how the exercise is done to someone
                                    who has never performed it before.
                                </Form.Text>
                            </Form.Group>
                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.instructErr}
                            </div>

                            <Form.Row>
                                <h4>Optional Details</h4>
                            </Form.Row>
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
                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label style={{fontSize: "1.15rem"}}>Video URL</Form.Label>
                                        <Form.Control
                                            style={{fontSize: "1.15rem"}}
                                            onChange={this.onChange}
                                            value={this.state.videoURL}
                                            name="videoURL"
                                            id="videoURL"
                                            placeholder="..."
                                            type="box"
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <p>{' '}</p>
                            <Form.Row>
                                <Col sm={1}>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default AddExercise;