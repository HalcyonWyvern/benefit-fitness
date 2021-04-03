import React, {Component, useState} from "react";
import {Button, Container, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import {render} from "@testing-library/react";
import {Link} from "react-router-dom";
import {func} from "prop-types";


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


    // handleChange = ({ target }) => {
    //     const { name, value } = target;
    //     this.setState({ [name]: value });
    // };

    clickHandler = (exercise) => {
        this.setState({})
        console.log(exercise)

        // return exercise.map(options =>(
        //     <div key={options._id}>
        //         <p>{options.exerciseName}</p>
        //     </div>
        //
        // ))

        // return(
        //     <div key={index}>
        //         <p>{exercise.exerciseName}</p>
        //     </div>
        // )
        // choices.map(exercise =>
        // <div key={exercise._id}>
        //     <h3>{exercise.exerciseName}</h3>
        //     <p>Instructions: {exercise.instructions}</p>
        //     <p>Equipment: {exercise.equipment}</p>
        //     <p>Sets: {exercise.sets}</p>
        //     <p>Reps: {exercise.reps}</p>
        //     <p>Exercise Type: {exercise.exerciseType}</p>
        //     <p>Video Link: <a target="_blank" href={exercise.videoURL}>{exercise.videoURL}</a></p>
        // </div>)
    }



    // console.log('Button Clicked');



    // submit = (event) => {
    //     event.preventDefault();
    //
    //     const payload = {
    //         exerciseName: this.state.exerciseName,
    //         equipment: this.state.equipment,
    //         reps: this.state.reps,
    //         sets: this.state.sets,
    //         exerciseType: this.state.exerciseType,
    //         videoURL: this.state.videoURL,
    //         instructions: this.state.instructions
    //     }
    //
    // }

    displayExercises = (choices) => {
        // const pages =[5, 10, 25]
        // const [page,setPage] = useState(0)
        // const [rowsPerPage, setRowsPerPage] = useState(pages[page])

        if (!choices.length) return null;

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Exercise Name</th>
                        <th>Exercise Type</th>
                        <th>Equipment</th>
                    </tr>
                    </thead>
                    <tbody>

                    {choices.map(exercise =>
                    <tr key={exercise._id}>
                        <td><Link onClick={this.clickHandler.bind(this, exercise)}>{exercise.exerciseName}</Link></td>
                        <td>{exercise.exerciseType}</td>
                        <td>{exercise.equipment}</td>
                    </tr>
                    )}


                    </tbody>

                </Table>

            {/*{this.state.choices.map((exercise, index) =>*/}
            {/*<>*/}
            {/*    <div key={index}>*/}
            {/*        <p>{exercise.exerciseName}</p>*/}
            {/*    </div>*/}
            {/*</> )}*/}
                {/*{this.state.choices.map(exercise =>(*/}
                {/*    <div key={exercise._id}>*/}

                {/*    </div>*/}
                {/*))}*/}
                {/*{choices.map(exercise =>*/}
                {/*    <>*/}
                {/*    <h3>{exercise.exerciseName}</h3>*/}
                {/*    <p>Instructions: {exercise.instructions}</p>*/}
                {/*    <p>Equipment: {exercise.equipment}</p>*/}
                {/*    <p>Sets: {exercise.sets}</p>*/}
                {/*    <p>Reps: {exercise.reps}</p>*/}
                {/*    <p>Exercise Type: {exercise.exerciseType}</p>*/}
                {/*    <p>Video Link: <a target="_blank" href={exercise.videoURL}>{exercise.videoURL}</a></p>*/}
                {/*    </>*/}
                {/*)}*/}



            </div>

        );
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