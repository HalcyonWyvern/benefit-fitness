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
                    <Modal.Title>Navigating the Exercise Library</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>The Exercise Library</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The Exercise library displays a selection of exercises that have been created by
                        the administrators of Benefit Fitness for usage within workout plans. Each exercise
                        is classified based on its type and each exercise can include information on required
                        equipment, instructions, and an educational video on how to perform that exercise.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        The exercises are grouped together into a table and you can view information about
                        that exercise by hitting <Button>TOGGLE DETAILS</Button> in the "More Info" column.
                    </p>
                    <h4>Search Functionality</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        It is possible to search for an exercise by its <strong>EXERCISE NAME </strong>
                        or <strong>EXERCISE TYPE.</strong> In order to use the search tool, use the field
                        in the top left of the table and type in your query.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserDashHelp;