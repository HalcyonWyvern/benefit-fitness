import React from 'react';
import {Button, Modal} from "react-bootstrap";

const AdminPlanHelp = () => {
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
                    <Modal.Title>Navigating the Plan Library</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>The Workout/Plan Library</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The Plan library features a variety of plans that have been created by the administrators
                        of Benefit Fitness. These plans group together exercises from the exercise library and provide
                        useful instruction on how you would use the workout plan and the type of plan.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        The plans are grouped together into a table  similar to the exercise library and you can view information about
                        that plan by hitting <Button>TOGGLE DETAILS</Button> in the "More Info" column.
                    </p>
                    <h4>Search Functionality</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        It is possible to search for an plan by its <strong>PLAN NAME </strong>
                        or <strong>PLAN TYPE.</strong> In order to use the search tool, use the field
                        in the top left of the table and type in your query.
                    </p>
                    <h4>Viewing Plan Exercises</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        In order to see the plan's exercises, you must toggle details and refer to the list of exercises.
                    </p>
                    <h2>Managing Plans</h2>
                    <p style={{fontSize: "1.15rem"}}>
                        Plans are able to be managed from the administrator's side of the application. You can add new plans,
                        delete plans, or update plan information from the plan page in the admin dashboard.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Adding New Plans: </strong> Use the <Button>NEW PLAN</Button> button on the main page to add
                        new plans and fill out the information within.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Deleting Plans: </strong> Use the <Button variant="outline-danger">DELETE</Button> button
                        to the right of the plan's row in order to remove the plan from the database.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Adding Exercises: </strong> Use the <Button>Toggle Details</Button> button
                        to the right of the plan's row in order to see the exercises within. Afterwards, you can
                        add an exercise by hitting the <Button>Add Exercise to Plan</Button> button.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Adding Exercises: </strong> Use the <Button>Toggle Details</Button> button
                        to the right of the plan's row in order to see the exercises within. Afterwards, choose
                        the exercise you want to delete and hit the <Button variant="outline-danger">DELETE EXERCISE</Button>
                        button to the right.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminPlanHelp;