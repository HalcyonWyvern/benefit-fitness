import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import AddExercise from "../page_components/AddExercise"

class AdminExercises extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <p>{' '}</p>
                </Row>
                <Row>
                    <AddExercise/>
                </Row>
            </Container>
        );
    }
}
export default AdminExercises;