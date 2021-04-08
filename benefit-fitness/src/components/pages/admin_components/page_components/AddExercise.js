import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Modal} from "react-bootstrap";


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

        if (!this.state.exerciseType) {
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
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    New Exercise
                </Button>
                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                            <Modal.Title>Create a new Exercise entry.</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Exercise Name</Form.Label>
                                <Form.Control
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
                                <Form.Label>Required Equipment</Form.Label>
                                <Form.Control
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
                                <Form.Label>Exercise Type</Form.Label>
                                <Form.Control
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
                                <Form.Label>Instructions</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.instructions}
                                    name="instructions"
                                    id="instructions"
                                    as="textarea"
                                    aria-describedby="textHelpBlock"
                                />
                                <Form.Text id="textHelpBlock" muted>
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
                                        <Form.Label>Sets</Form.Label>
                                        <Form.Control
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
                                        <Form.Label>Reps</Form.Label>
                                        <Form.Control
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
                                        <Form.Label>Video URL</Form.Label>
                                        <Form.Control
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
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default AddExercise;