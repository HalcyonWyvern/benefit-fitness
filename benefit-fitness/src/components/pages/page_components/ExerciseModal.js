import React from "react";
import {Modal} from "react-bootstrap";


const ExerciseModal = ({ exerciseData, showState, hideModal}) => {
    return (
        <Modal size="xl" show={showState} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{exerciseData.exerciseName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>There's nothing here just yet.</p>

            </Modal.Body>
        </Modal>
    )
}

export default ExerciseModal;