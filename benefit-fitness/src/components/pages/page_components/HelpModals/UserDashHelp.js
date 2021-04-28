import React from 'react';
import {Button, Modal} from "react-bootstrap";

const UserDashHelp = () => {
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
                    <Modal.Title>Navigating the Dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>The Dashboard</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The Dashboard includes a selection of cards that also act as links
                        to other pages within the application. These links are also
                        available in the top right of the application.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        Alongside these cards is the button to completely log out of the application.
                        Unless your session expires or you logout, you will remain logged in to
                        Sturgeon as your current user.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserDashHelp;