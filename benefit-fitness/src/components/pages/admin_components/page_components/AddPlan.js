import React, {Component, useEffect} from "react";
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";


class AddExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: "",
            trainerExplanation: "",
            type: "",
            exercises: []
        }
    }

    // componentDidMount() {
    //     this.getProfile();
    // }
    //
    // getProfile = () => {
    //     // const {user} = this.props.auth;
    //     axios.get('/api/exercises/')
    //         .then(res => {
    //             const data = res.data
    //             this.setState({exercises: data})
    //             console.log(data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

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


        if (!this.state.name) {
            nameErr = "Please name the Plan."
        }

        if (nameErr) {
            this.setState({
                nameErr,
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
            const newPlan = {
                name: this.state.name,
                trainerExplanation: this.state.trainerExplanation,
                type: this.state.type,
            }
            console.log(newPlan);

            axios.post("api/plans/", newPlan)
                .then(res => {
                    console.log(res.data);
                })

            this.setState({
                name: "",
                trainerExplanation: "",
                type: "",
                isOpen: false
            })
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    New Plan
                </Button>
                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Plan.</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>This tool allows you to create empty workouts for the workout library. To add
                        an exercise into newly created workouts, please use the "Add Exercises" button to
                        the right of the plans table on the Admin Page.</p>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Plan Name</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    name="name"
                                    id="name"
                                    placeholder="Exercise Plan Name"
                                    type="Box"
                                />
                            </Form.Group>

                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.nameErr}
                            </div>

                            {/*<Form.Group>*/}
                            {/*    <Form.Label>Exercises</Form.Label>*/}
                            {/*    <Form.Control*/}
                            {/*        onChange={this.onChange}*/}
                            {/*        value={this.state.exercises}*/}
                            {/*        name="exercises"*/}
                            {/*        id="exercises"*/}
                            {/*        as="select"*/}
                            {/*    >*/}
                            {/*        <option>Select an Exercise</option>*/}
                            {/*        {this.state.exercises.map(data =>*/}
                            {/*            <option>{data.exerciseName}</option>*/}
                            {/*        )}*/}
                            {/*        /!*<option>Please Select a Plan Type</option>*!/*/}
                            {/*        /!*<option>Strength Building</option>*!/*/}
                            {/*        /!*<option>Recreation</option>*!/*/}
                            {/*        /!*<option>Health and Wellness</option>*!/*/}
                            {/*        /!*<option>General Fitness</option>*!/*/}
                            {/*    </Form.Control>*/}
                            {/*    <Button>Add</Button>*/}
                            {/*</Form.Group>*/}

                            <Form.Row>
                                <h4>Optional Details</h4>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Plan Comments</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.trainerExplanation}
                                    name="trainerExplanation"
                                    id="trainerExplanation"
                                    placeholder="You can explain the plan or tell users why you recommend it."
                                    as="textarea"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Plan Type</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.type}
                                    name="type"
                                    id="type"
                                    as="select"
                                >
                                    <option>Please Select a Plan Type</option>
                                    <option>Strength Building</option>
                                    <option>Recreation</option>
                                    <option>Health and Wellness</option>
                                    <option>General Fitness</option>
                                </Form.Control>
                            </Form.Group>


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