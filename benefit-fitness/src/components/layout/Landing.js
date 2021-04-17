import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";

class Landing extends Component {
    render() {
        return (
            <Container fluid>
                <div style={{height: "35vh", justifyContent: 'center'}} className="valign-wrapper">
                    <Row>
                        <Col className="center-align">
                            <h1>
                                <span style={{fontFamily: "Roboto"}}>STURGEON</span>
                            </h1>
                            <p className="flow-text grey-text text-darken-1">
                                A health and wellness application by Benefit Fitness.
                            </p>
                            <br/>
                            <Col className="s6">
                                <Button as={Link} to="/register" block>
                                    <span style={{fontFamily: 'Roboto'}}>Register</span>
                                </Button>
                            </Col>
                            <Col className="s6">
                                <Button as={Link} to="/login" block>
                                    <span style={{fontFamily: 'Roboto'}}>Login</span>
                                </Button>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}
export default Landing;