import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form, Modal} from "react-bootstrap";

class DeleteUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            username: "",
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

    onSubmit = e => {
        e.preventDefault();

        if (this.state.username !== "administrator") {
            axios
                .delete('/api/requests/user/' + this.state.username)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            axios
                .delete('/api/users/' + this.state.username)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })


            this.setState({
                username: "",
            })
            window.location.reload(false);
        } else {
            alert("Hello, Dr. Rottman. Do not delete the administrator.")
        }
    }
S
    render() {
        return(
            <>
                <Button variant="outline-danger" className="ml-2" onClick={this.showModal}>
                    Delete A User
                </Button>
                <Modal size="md" show={this.state.isOpen} onHide={this.hideModal}
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
                        <Modal.Title>Delete A User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <h4>ADMIN NOTICE</h4>
                        <p style={{fontSize: "1.15rem"}}>
                            You are about to delete a user from the system. This is an emergency button
                            in the case that someone forgets their password and sends an email to Sam.
                        </p>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label style={{fontSize: "1.15rem"}}>Username</Form.Label>
                                <Form.Control
                                    style={{fontSize: "1.15rem"}}
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    type="Box"
                                />
                            </Form.Group>

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

export default DeleteUser;