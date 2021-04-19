import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import RequestsTable from "../page_components/RequestsTable"
import BackToDashButton from "../page_components/BackToDashButton"

class AdminRequests extends Component {

    render() {
        return (
            <Container style={{marginBottom: '20rem'}}>
                <p>{' '}</p>
                <Row>
                <BackToDashButton/>
                </Row>
                <Row>
                <RequestsTable />
                </Row>

            </Container>
        );
    }
}
export default AdminRequests;