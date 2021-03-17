import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Container} from "react-bootstrap";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper bg-primary">
                        <Container>
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace",
                            }}
                            className="col s6 brand-logo center black-text"
                        >
                          BENEFIT FITNESS
                        </Link>
                        </Container>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;