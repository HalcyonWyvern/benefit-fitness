import React, {Component} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";


class Exercises extends Component {

    constructor() {
        super();
        this.state = {
            exerciseName: "",
            equipment: "",
            reps: "",
            sets: "",
            exerciseType: "",
            videoURL: "",
            instructions: "",
            errors: {}
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        this.setState({
            [id]: value
        })
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            exerciseName: this.state.exerciseName,
            equipment: this.state.equipment,
            reps: this.state.reps,
            sets: this.state.sets,
            exerciseType: this.state.exerciseType,
            videoURL: this.state.videoURL,
            instructions: this.state.instructions
        }

        axios({
            url: '/api/',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent');
            })
            .catch(() => {
                console.log('Internal server error')
            });

    }

    render() {

        // console.log('State:', this.state);

        return (
            <Container style={{ marginBottom: "5rem" }}>

                <form onSubmit={this.submit}>

                    {/*<h1>Add an Exercise</h1>*/}
                    {/*<Button variant={}>Add Exercise</Button>*/}

                    <Form.Group>
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control
                            placeholder="Exercise Name"
                            id="exerciseName"
                            as="textarea"
                            value={this.state.exerciseName}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Equipment</Form.Label>
                        <Form.Control
                            placeholder="Equipment"
                            id="equipment"
                            as="textarea"
                            value={this.state.equipment}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Reps</Form.Label>
                        <Form.Control
                            placeholder="Reps"
                            id="reps"
                            as="textarea"
                            value={this.state.reps}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Sets</Form.Label>
                        <Form.Control
                            placeholder="Sets"
                            id="sets"
                            as="textarea"
                            value={this.state.sets}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Exercise Type</Form.Label>
                        <Form.Control
                            placeholder="Exercise Type"
                            id="exerciseType"
                            as="textarea"
                            value={this.state.exerciseType}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control
                            placeholder="Video URL"
                            id="videoURL"
                            as="textarea"
                            value={this.state.videoURL}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control
                            placeholder="Instructions"
                            id="instructions"
                            as="textarea"
                            value={this.state.instructions}
                            rows={1}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <button>Submit</button>
                </form>
            </Container>
        );
    }
}

export default Exercises;