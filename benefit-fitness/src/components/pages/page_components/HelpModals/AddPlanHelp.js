import {Button, Modal} from "react-bootstrap";
import React from 'react';

const AddPlanHelp = () => {
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
                    <Modal.Title>Plan Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h3>Creating a New Plan</h3>
                    <p style={{fontSize: "1.15rem"}}>
                        Plans, by default, do not come with exercises within them. The "Create a New Plan"
                        tool is designed to create an empty plan which you can then add exercises into.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        In order to create a plan you must give it a name and use the <strong>SUBMIT </strong>
                        button at the bottom of the form.
                    </p>
                    <h3>Field Information</h3>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Plan Name: </strong>This field is required and is the name of the plan as it appears
                        in the workout library. It is required to be unique in order to assist user search capabilities.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Plan Comments: </strong>You may explain what this plan is for or give users any other
                        information on what they should be doing while following along with this workout.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Plan Type: </strong>This field classifies the workout into one of the given categories.
                        If the plan is used in a class, then it is recommended that you include that in the comments instead.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Tags: </strong>This field is used for search tags. Each tag must be separated by a space in
                        order to be acceptable to the provided search functionality.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddPlanHelp;