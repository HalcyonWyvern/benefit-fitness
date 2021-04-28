import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import { Typeahead } from 'react-bootstrap-typeahead';
import {connect} from "react-redux";

class AddPlanExercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercise: "",
            reps: "12",
            sets: "3",
            time: "60",
            choices: [],
            isOpen: false
        }
    }

    componentDidMount() {
        this.getExercises();
    }

    getExercises = () => {
        // const {user} = this.props.auth;
        axios.get("api/exercises/")
            .then(res => {
                const data = res.data
                this.setState({choices: data})
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
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
        let exerciseErr = "";

        if(!this.state.exercise) {
            exerciseErr = "Please choose an exercise"
        }
        if (exerciseErr) {
            this.setState({
                exerciseErr,
            });
            return false;
        } else {
            return true;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const isValid = this.valid();
        if (isValid) {

            const added = {
                exercise: this.state.exercise,
                reps: this.state.reps,
                sets: this.state.sets,
                time: this.state.time
            }
            console.log(added);


            axios.put(("api/plans/add/" + this.props.planID), added)
                .then(res => {
                    console.log(res.data);
                })
            this.setState({
                exercise: "",
                isOpen: false
            })
            window.location.reload(false);
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    Add Exercise to Plan
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
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add an exercise to the plan.</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group style={{paddingBottom: "0.15rem"}}>
                                <Form.Label style={{fontSize: "1.15rem"}}>Select an Exercise</Form.Label>
                                <Typeahead
                                    id="exercise"
                                    name="exercise"
                                    labelKey={option => `${option.exerciseName}`}
                                    onChange={(selected) => {
                                        this.setState({exercise: selected}, () => {
                                            console.log("selected: " + selected)
                                        });
                                    }}
                                    options={this.state.choices}
                                    value={this.state.exercise}
                                    placeholder="Search or scroll to select an exercise."
                                    as="box"
                                />
                            </Form.Group>

                            <h3>Optional Customization</h3>
                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label style={{fontSize: "1.15rem"}}>Reps</Form.Label>
                                        <Form.Control
                                            style={{fontSize: "1.15rem"}}
                                            onChange={this.onChange}
                                            value={this.state.reps}
                                            name="reps"
                                            id="reps"
                                            placeholder="Customized Reps"
                                            type="box"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{fontSize: "1.15rem"}}>Sets</Form.Label>
                                        <Form.Control
                                            style={{fontSize: "1.15rem"}}
                                            onChange={this.onChange}
                                            value={this.state.sets}
                                            name="sets"
                                            id="sets"
                                            placeholder="Customized Sets"
                                            type="box"
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Time in Seconds</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.time}
                                    name="time"
                                    id="time"
                                    placeholder="Time in Seconds"
                                    type="box"
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

AddPlanExercises.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(AddPlanExercises);

// export default AddPlanExercises;