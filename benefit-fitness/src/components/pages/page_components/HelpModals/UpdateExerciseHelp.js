import React from 'react';
import {Button, Modal} from "react-bootstrap";

const UpdateExerciseHelp = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return(
        <>
            <Button variant="outline-success" onClick={handleOpen}>Help</Button>
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
                    <Modal.Title>Updating the Exercise Library</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h3>Modifying an Exercise</h3>
                    <p style={{fontSize: "1.15rem"}}>
                        When modifying an exercise, you are able to see the pre-existing values for each
                        field for that exercise. Information is able to be modified and changed by the admin
                        user. For information on each field, see below.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        When all required fields are filled out, hit the <strong>SUBMIT</strong> button at the
                        bottom of the form.
                    </p>
                    <h3>Required Field Information</h3>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Exercise Name:</strong> The display name of the exercise within the library.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Required Equipment:</strong> Equipment need to perform the exercise properly. If no
                        equipment is required, you must specify this field as <strong>None.</strong>
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Exercise Type:</strong> This field classifies the exercise into the category
                        of muscles that it focuses on. For multiple muscle groups, you may classify it as a
                        <strong> compound exercise.</strong>
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Instructions:</strong> This field should describe the steps for performing an
                        exercise and include extra information that you would want users to know.
                    </p>
                    <h3>Optional Fields</h3>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Sets and Reps:</strong> These are both optional fields for the <strong>recommended number
                    </strong> of reps or sets for this exercise.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Video URL:</strong> In order to render a video on the user-facing exercise library, you
                        must submit a Vimeo or Youtube link of the exercise. There is no required format for how
                        the video URL must be typed into the field; any <strong>Video URL</strong> will render.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateExerciseHelp;