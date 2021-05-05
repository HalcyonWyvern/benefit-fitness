import React from 'react';
import {Button, Modal} from "react-bootstrap";

const UserPlanHelp = () => {
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
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Tag Searching</strong> is also supported by the search bar, so you can use the
                        search bar to search by one or more tags that are included within the plan's TAG section.
                    </p>
                    <h4>Viewing Plan Exercises</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        In order to see the plan's exercises, you must toggle details and click on the exercise
                        that you would like to view. Each <strong>Exercise Entry </strong> is a button that you
                        can click in order to get information on that particular exercise for your currently
                        viewed plan.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserPlanHelp;