import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import AddPlan from "../page_components/AddPlan";

class AdminPlans extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <p>{' '}</p>
                </Row>
                <Row>
                    <AddPlan/>
                </Row>
            </Container>
        );
    }
}
export default AdminPlans;