import React, {Component} from "react";
import {Button, Card, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class AdminDash extends Component {

    render() {
        return (
            <Container>
                <p>{' '}</p>
                <Row style={{ justifyContent: "Center" }}>
                    <h1>Admin Dashboard</h1>
                </Row>
                <Row style={{ justifyContent: "Center" }}>
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                            <Card.Title>
                                Manage Exercises
                            </Card.Title>
                            <Button variant="primary" as={Link} to="/admin_exercises">GO</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', height: '8rem' }} className="ml-2">
                        <Card.Body>
                            <Card.Title>
                                Manage Plans
                            </Card.Title>
                            <Button variant="primary" as={Link} to="/admin_plans">GO</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', height: '8rem' }} className="ml-2">
                        <Card.Body>
                            <Card.Title>
                                Manage Requests
                            </Card.Title>
                            <Button variant="primary" as={Link} to="/admin_requests">GO</Button>
                        </Card.Body>
                    </Card>
                </Row>

                <Row>
                    {/*Misc. actions in this row*/}
                    <Card style={{ width: '80rem', height: '20rem'}}>

                    </Card>
                </Row>
                <Row>
                    {/*Misc. actions in this row*/}
                    <Card style={{ width: '80rem', height: '20rem'}}>

                    </Card>
                </Row>
                <Row>
                    {/*Misc. actions in this row*/}
                    <Card style={{ width: '80rem', height: '20rem'}}>

                    </Card>
                </Row>
            </Container>
        );
    }
}
export default AdminDash;