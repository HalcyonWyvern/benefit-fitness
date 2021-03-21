import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Container} from "react-bootstrap";

class Landing extends Component {
    render() {
        return (
            <Container fluid>
                <div style={{height: "35vh", justifyContent: 'center'}} className="valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h1>
                                <span style={{fontFamily: "monospace"}}>STURGEON</span>
                            </h1>
                            <p className="flow-text grey-text text-darken-1">
                                A health and wellness application by Benefit Fitness.
                            </p>
                            <br/>
                            <div className="col s6">
                                <Link
                                    to="/register"
                                    style={{
                                        width: "140px",
                                        borderRadius: "2px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Register
                                </Link>
                            </div>
                            <div className="col s6">
                                <Link
                                    to="/login"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
export default Landing;