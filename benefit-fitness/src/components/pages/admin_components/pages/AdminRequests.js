import React, {Component} from "react";
import {Card, Container, Row} from "react-bootstrap";
import RequestsTable from "../page_components/RequestsTable"
import BackToDashButton from "../page_components/BackToDashButton"

class AdminRequests extends Component {

    render() {
        return (
            <Container>
                <p>{' '}</p>
                <Row>
                <BackToDashButton/>
                </Row>
                <Row>
                <RequestsTable />
                </Row>
                <Card bg="dark" style={{width: '20rem', height: '15rem'}}>

                </Card>
            </Container>
        );
    }
}
export default AdminRequests;