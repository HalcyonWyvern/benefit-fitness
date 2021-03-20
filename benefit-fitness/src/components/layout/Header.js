import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import bannerLogo from '../images/BenefitLogo1.png';

class Header extends Component {
    render() {
        return (
            <div>
                <Container className="p-0" fluid={true}>

                    <Navbar className="border-bottom" bg="transparent" expand="lg">
                        <Navbar.Brand as={Link} to="/">
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
                            <Nav className="ml-auto">
                                <Link className="nav-link" to="/dashboard">Home</Link>
                                <Link className="nav-link" to="/exercises">Exercises</Link>
                                <Link className="nav-link" to="/plans">Plans</Link>
                                <Link className="nav-link" to="/userplans">My Plans</Link>
                                <Link className="nav-link" to="/about">About</Link>
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        );
    }
}
export default Header;