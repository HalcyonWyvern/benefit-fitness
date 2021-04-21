import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form, Modal} from "react-bootstrap";

class UpdatePlan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            name: props.name || "",
            trainerExplanation: props.explanation || "",
            type: props.type || ""
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

            axios.put("api/plans/" + this.props.planID, newPlan)
                .then(res => {
                    console.log(res.data);
                })

            this.setState({
                name: "",
                trainerExplanation: "",
                type: "",
                isOpen: false
            })

            window.location.reload(false);
        }
    }

    render() {
        return(
            <>
                <Button variant="success" className="ml-2" onClick={this.showModal}>
                    Update Plan
                </Button>
                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Plan Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <h5>USER NOTICE</h5>
                        <p>This tool allows you to update workout information that the users use to browse the library. To add
                            an exercise into created workouts, please use the "Add" button located in the exercises section
                            of the toggled plan.</p>
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

                            <Form.Row>
                                <h4>Optional Details</h4>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Plan Comments or Explanation</Form.Label>
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

export default UpdatePlan;