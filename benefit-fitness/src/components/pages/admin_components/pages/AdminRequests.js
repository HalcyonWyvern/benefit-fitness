import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import RequestsTable from "../page_components/RequestsTable"
import BackToDashButton from "../page_components/BackToDashButton"
import AdminRequestHelp from "../../page_components/HelpModals/AdminRequestHelp";

class AdminRequests extends Component {

    render() {
        return (
            <Container style={{marginBottom: '20rem'}}>
                <p>{' '}</p>
                <Row>
                    <BackToDashButton/>
                    <Col>
                        <AdminRequestHelp/>
                    </Col>
                </Row>
                <Row>
                <RequestsTable />
                </Row>

            </Container>
        );
    }
}
export default AdminRequests;