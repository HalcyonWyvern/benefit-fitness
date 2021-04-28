import React from 'react';
import {Button, Modal} from "react-bootstrap";

const RegisterHelp = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return(
        <>
            <Button variant="outline-success" onClick={handleOpen}>?</Button>
            <Modal
                size="md"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: 0,
                    boxShadow: "none",
                }}
                scrollable
                show={open}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>Creating a New Account</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        In order to create an account you must fill out all fields on the registration page. The username
                        field and the email field must be unique in order for registration to be completed.
                    </p>
                    <h4>Field Information</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Username: </strong> The username field is your username that you will use to log
                        into the application. Please ensure that you keep track of it.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Email: </strong> The email field is the email that administrators will be contacting
                        you at. It must be unique within the system in order to be accepted by the registration tool.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Address Section: </strong>The address fields within the registration form are required
                        only for knowledge that our administrators may require when reaching out to you. Your geographic
                        location is relevant to our training services.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Password: </strong>This is the password that you will use to log into your account
                        on the login page. It must be a string of numerical and alphabetical characters and is required
                        to be at least six digits long.
                    </p>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegisterHelp;