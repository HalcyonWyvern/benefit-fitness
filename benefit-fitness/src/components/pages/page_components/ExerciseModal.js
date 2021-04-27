import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import ReactPlayer from 'react-player/lazy'



const ExerciseModal = ({exerciseData, showState, hideModal, sets, reps, time}) => {
    return (
        <Modal size="xl" show={showState} onHide={hideModal}
               style={{
                   position: "absolute",
                   left: "50%",
                   top: "45%",
                   transform: "translate(-50%, -50%)",
                   background: 0,
                   boxShadow: "none",
               }}
               scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {exerciseData.exerciseName} | Sets: {sets} | Reps: {reps} | Timer: {time} Seconds
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row style={{ justifyContent: "center"}}>
                        <h5>Video Demonstration</h5>
                    </Row>
                    <Row>
                        <Col style={{paddingLeft: "14rem"}}>
                            <ReactPlayer controls={true} url={exerciseData.videoURL}/>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: "1rem"}}>
                        <Col xs={10}>
                            <h5 style={{fontSize: "1.25rem"}}>Exercise Instructions</h5>
                            <p style={{fontSize: "1.25rem"}}>{exerciseData.instructions}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 style={{fontSize: "1.25rem"}}>Exercise Type Classification</h5>
                            <p style={{fontSize: "1.25rem"}}>{exerciseData.exerciseType}</p>
                        </Col>
                        <Col>
                            <h5 style={{fontSize: "1.25rem"}}>Required Equipment</h5>
                            <p style={{fontSize: "1.25rem"}}>{exerciseData.equipment}</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ExerciseModal;