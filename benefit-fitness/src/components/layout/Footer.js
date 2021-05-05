//rcc
import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar, Row,} from "react-bootstrap";
import bannerLogo2 from '../images/BenefitLogo2.png';
import Facebooky from '../images/Facebook.png'
import Insta from '../images/Insta1.jpg'


class Footer extends Component {
    render() {
        return (
            <div>
                <Navbar style={{height: 70, whiteSpace: "nowrap"}} className="navbar-light border-top border-primary" fixed="bottom" bg="dark">
                    <Navbar.Brand className="text-primary" as={Link} to="/about" style={{fontSize: 30}}>
                        <img
                            alt=""
                            src={bannerLogo2}
                            width="50"
                            height="50"
                            className="d-inline-block align-self-center"
                        /> {' '}
                        STURGEON
                    </Navbar.Brand>
                    <Nav className="ml-auto" style={{fontSize: 20}}>
                        <Nav.Item>
                            Phone: (314) 800-7051
                        </Nav.Item>
                        <Nav.Item className="pl-3">
                            Email: sam@benefitfitness.org
                        </Nav.Item>
                        <Nav.Item className="pl-3">
                            Follow us:
                            <a target="_blank" href="https://facebook.com/benefit.ngo/" >
                                {'  '}
                                <img
                                    className="rounded-circle d-inline-block align-self-center"
                                    alt="100x100"
                                    src={Facebooky}
                                    width="50"
                                    height="50"
                                />
                            </a>
                            <a target="_blank" href="https://www.instagram.com/benefit.fitness/">
                                {'  '}
                                <img
                                    className="rounded-circle d-inline-block align-self-center"
                                    alt="100x100"
                                    src={Insta}
                                    width="50"
                                    height="50"
                                />
                            </a>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                {/*<Card.Footer fixed="bottom">*/}
                {/*    Benefit Fitness*/}
                {/*</Card.Footer>*/}
            </div>
        );
    }
}

export default Footer;