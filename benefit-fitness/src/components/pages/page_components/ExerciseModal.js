import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import ReactPlayer from 'react-player/lazy'



const ExerciseModal = ({ exerciseData, showState, hideModal}) => {
    return (
        <Modal size="xl" show={showState} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{exerciseData.exerciseName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col style={{paddingLeft: "14rem"}}>
                            <ReactPlayer controls={true} url={exerciseData.videoURL}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={10}>
                            <h5>Exercise Instructions</h5>
                            <p>{exerciseData.instructions}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Exercise Type Classification</h5>
                            <p>{exerciseData.exerciseType}</p>
                        </Col>
                        <Col>
                            <h5>Required Equipment</h5>
                            <p>{exerciseData.equipment}</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ExerciseModal;