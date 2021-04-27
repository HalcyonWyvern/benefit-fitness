import React from 'react';
import {Button, Modal} from "react-bootstrap";

const AdminRequestHelp = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return(
        <>
            <Button variant="outline-success" onClick={handleOpen}>Help!</Button>
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
                    <Modal.Title>Using the Request Viewer</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h2>The Form Cards</h2>
                    <p style={{fontSize: "1.15rem"}}>
                        Each request that is submitted by a user is formatted into a "Request Card." The newest
                        entries are shown first and the oldest entries are shown last.
                    </p>
                    <h4>User Information</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        User information is displayed on the top left of each card. This is used in order to
                        find their name and contact information to handle each user request.
                    </p>
                    <h4>Address Information</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        Address information is displayed in the top right of each card. This information is useful
                        to know about the geographic locations of clients in relation to Benefit Fitness's area
                        of operation.
                    </p>
                    <h4>Contact Form Body</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The contact form body contains the actual request itself rather than information about the user.
                        Each request is classified by type and the client's preferred method of contact.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        In the bottom right of each request card, there is a message body from the user that goes
                        into more detail about their particular request and acts in the same manner as an email
                        message body.
                    </p>
                    <h2>Clearing out Requests</h2>
                    <p style={{fontSize: "1.15rem"}}>
                        Each request comes with a <strong>DELETE </strong>button in the top right. Simply clicking the
                        button will remove the request and clear space in your request database.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminRequestHelp;