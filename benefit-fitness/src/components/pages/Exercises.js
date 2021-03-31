import React, {Component} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {render} from "@testing-library/react";


class Exercises extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseName: "",
            equipment: "",
            reps: "",
            sets: "",
            exerciseType: "",
            videoURL: "",
            instructions: "",
            choices: [],
            errors: {}
        };
    }

    componentDidMount = () => {
        this.getExercise();
    }

    getExercise = () => {
        axios.get('/api/exercises')
            .then((response) => {
                const exercise = response.data
                this.setState({ choices: exercise})

                console.log('Data has been received');
            })
            .catch(() => {
                alert('Error');
            });
    }


    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };


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

        // axios({
        //     url: '/api/',
        //     method: 'POST',
        //     data: payload
        // })
        //     .then(() => {
        //         console.log('Data has been sent');
        //         this.getExercise();
        //     })
        //     .catch(() => {
        //         console.log('Internal server error')
        //     });

    }

    displayExercises = (choices) => {
        if (!choices.length) return null;

        return choices.map((exercise, index) =>(
            <div key={index}>
                <h3>{exercise.exerciseName}</h3>
                <p>Instructions: {exercise.instructions}</p>
                <p>Equipment: {exercise.equipment}</p>
                <p>Sets: {exercise.sets}</p>
                <p>Reps: {exercise.reps}</p>
                <p>Exercise Type: {exercise.exerciseType}</p>
                <p>Video Link: <a target="_blank" href={exercise.videoURL}>{exercise.videoURL}</a></p>

            </div>
        ));
    };

    render() {
        return (

            <Container style={{ marginBottom: "5rem" }}>
                <div className="exercises">
                    {this.displayExercises(this.state.choices)}
                </div>
            </Container>

        );


    }

}


export default Exercises;


{/*<form onSubmit={this.submit}>*/}

{/*    <Form.Group>*/}
{/*    <Form.Label>Exercise Name</Form.Label>*/}
{/*    <Form.Control*/}
{/*        placeholder="Exercise Name"*/}
{/*        id="exerciseName"*/}
{/*        as="textarea"*/}
{/*        value={this.state.exerciseName}*/}
{/*        rows={1}*/}
{/*        onChange={this.handleChange}*/}
{/*    />*/}
{/*    </Form.Group>*/}
{/*    <button>Submit</button>*/}
{/*</form>*/}