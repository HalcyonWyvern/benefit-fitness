import React from 'react';
import {Button, Modal} from "react-bootstrap";

const MyAccountHelp = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return(
        <>
            <Button variant="outline-success" onClick={handleOpen}>Learn More</Button>
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
                    <Modal.Title>My Account Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>Profile Section</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The profile section of the account page includes personal information about yourself and
                        mostly acts as a way for you to save your information. All information within your profile can be
                        updated with the <Button>UPDATE PROFILE</Button> button.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        All information in your Profile is completely optional to fill out.
                    </p>
                    <h4>Account Information Section</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The account section includes your email address as well as your address information. Information
                        within this section is used in any contact requests that you might submit and will be able to be
                        viewed by our administrators.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        In order to update your address, you can use the <Button>UPDATE ADDRESS</Button> button
                        in the top right of the account section.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MyAccountHelp;