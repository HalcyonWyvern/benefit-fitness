import React, {Component, useState} from "react";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import bannerLogo from '../images/BenefitLogo1.png';

class Header extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         activeKey: "0"
    //     }
    // }
    // handleSelect(selectedKey) {
    //     this.setState({activeKey: selectedKey});
    // }

    render() {
        return (
            <div>
                <Container className="p-0" fluid={true}>
                    <Navbar style={{height: 70}} className="navbar-light border-dark border-bottom" bg="primary" expand="lg">
                        <Navbar.Brand as={Link} to="/" className="text-white">
                            <img
                                alt=""
                                src={bannerLogo}
                                width="40"
                                height="40"
                                className="d-inline-block align-self-center"
                                />{' '}
                            STURGEON</Navbar.Brand>

                        <Navbar.Toggle className="border-0" aria-controls="navbar-toggle"/>
                        <Navbar.Collapse id="navbar-toggle">
                            <Nav style={{height: 70}} fill variant="tabs" className="pb-0 ml-auto">

                                <Nav.Link className="nav-link text-light" href="/dashboard" eventKey="0">Home</Nav.Link>
                                <Nav.Link className="nav-link text-light" href="/exercises" eventKey="1">Exercises</Nav.Link>
                                <Nav.Link className="nav-link text-light" href="/plans" eventKey="2">Plans</Nav.Link>
                                {/*<Link className="nav-link" to="/userplans">My Plans</Link>*/}
                                <Nav.Link className="nav-link text-light" href="/about" eventKey="3">About</Nav.Link>
                                <Nav.Link className="nav-link text-light" href="/contact" eventKey="4">Contact</Nav.Link>
                                <Nav.Link className="nav-link text-light" href="/profile" eventKey="5">My Account</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        );
    }
}
export default Header;