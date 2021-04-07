import React, {Component, useState} from "react";
import {Button, Container, Pagination, Row, Table, PaginationProps, PageItem} from "react-bootstrap";
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
            // isOpen: false,
            errors: {}
        };
    }

    componentDidMount = () => {
        this.getExercise();
        this.clickHandler();
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

    clickHandler = (e) => {

        this.setState({clicks: e})
        console.log({clicks: e})

    }



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

    //

    showModal = (exercise) => {
        this.setState({
            isOpen: true
        })
        console.log({clicks: exercise})
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        })
    }



    displayExercises = (choices) => {
        // const pages =[5, 10, 25]
        // const [page,setPage] = useState(0)
        // const [rowsPerPage, setRowsPerPage] = useState(pages[page])

        if (!choices.length) return null;

        // const pages = [5, 10, 25]
        // const [page, setPage] = useState(0)
        // const [rowsPerPage, setRowsPerPage] = useState(pages[page])
        //
        // const tblPagination = () => {
        //     const component = "div"
        //     const page = [page]
        //     const rowsPerPageOptions = [pages]
        //     const rowsPerPage = [rowsPerPage]
        //     const count = [choices.length]
        //
        // }

        let active = 1;
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Ellipsis key={number} active={number === active}>
                    {number}
                </Pagination.Ellipsis>,
            );
        }

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

                    {choices.map((exercise, index) =>
                        <>
                        <tr key={index}>
                            <td onClick={this.showModal}>{exercise.exerciseName}</td>
                            <td>{exercise.exerciseType}</td>
                            <td>{exercise.equipment}</td>
                        </tr>

                        </>
                    )}


                    </tbody>
                    <Pagination>{items}</Pagination>
                </Table>

                {/*<div>*/}
                {/*    {clicks.map(data =>*/}
                {/*    <h3>Name: {data.exerciseName}</h3>*/}
                {/*    )}*/}
                {/*</div>*/}
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
                <div>
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