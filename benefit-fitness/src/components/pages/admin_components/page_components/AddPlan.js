import React, {Component, useEffect} from "react";
import axios from "axios";
import {Button, Col, Form, Modal} from "react-bootstrap";
import AddPlanHelp from "../../page_components/HelpModals/AddPlanHelp";


class AddExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: "",
            trainerExplanation: "",
            type: "",
            tag: "",
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
        let typeErr = "";


        if (!this.state.name) {
            nameErr = "Please name the Plan."
        }

        if (!this.state.type || this.state.type === "Please Select a Plan Type") {
            typeErr = "Please choose the type for the Plan."
        }

        if (nameErr || typeErr) {
            this.setState({
                nameErr,
                typeErr
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
                tag: this.state.tag
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
                tag: "",
                isOpen: false
            })
            window.location.reload(false);
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    New Plan
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
                        <Modal.Title>Create a New Plan.</Modal.Title>
                        <Col>
                            <AddPlanHelp/>
                        </Col>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>USER NOTICE</h4>
                        <p style={{fontSize: "1.15rem"}}>This tool allows you to create empty workout skeletons for the workout library. To add
                        an exercise into newly created workouts, please use the "Add" button located in the exercises section
                            of the toggled plan.</p>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Plan Name</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
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

                            <Form.Row>
                                <h4>Optional Details</h4>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Plan Comments</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.trainerExplanation}
                                    name="trainerExplanation"
                                    id="trainerExplanation"
                                    placeholder="You can explain the plan or tell users why you recommend it."
                                    as="textarea"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Plan Type</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.type}
                                    name="type"
                                    id="type"
                                    as="select"
                                >
                                    <option>Please Select a Plan Type</option>
                                    <option>Strength Building</option>
                                    <option>CrossFit</option>
                                    <option>Zumba</option>
                                    <option>Calisthenics</option>
                                    <option>Recreation</option>
                                    <option>Health and Wellness</option>
                                    <option>General Fitness</option>
                                </Form.Control>
                            </Form.Group>

                            <div style={{fontSize: 12, color: "red"}}>
                                {this.state.typeErr}
                            </div>

                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Tags</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.tag}
                                    name="tag"
                                    id="tag"
                                    placeholder="These are search tags that can be used to find your new plan!"
                                    type="Box"
                                />
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