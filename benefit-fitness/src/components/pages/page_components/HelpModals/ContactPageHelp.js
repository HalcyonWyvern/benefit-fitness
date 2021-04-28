import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ContactPageHelp = () => {
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
                    <Modal.Title>Using the Contact Page</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>Contacting Benefit Fitness</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        This form includes a method for contacting the Benefit Fitness staff members by using
                        your username and the information that was included upon your registration.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        In order to submit a contact request, you must completely fill out all fields listed on
                        the contact page and then use the <Button>SUBMIT</Button> button.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        The <strong>USERNAME </strong> and <strong>TODAY'S DATE </strong> fields
                        are already filled out for you according to your information.
                    </p>
                    <h4>Field Information</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Phone Number: </strong>The phone number field requires a ten digit number that
                        administrators are able to contact you at. Using dashes or other non-numeric characters is
                        not allowed.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Request Type: </strong>The Request Type is the reason for your contact request. There are
                        multiple pre-made request types or you may specify your own reason for contact by using the Details
                        field.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Details: </strong>The Details field is for writing your message in the same format as you
                        would write an email to one of our trainers. Please be as specific as possible in your response in
                        order to maximize effectiveness.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ContactPageHelp;