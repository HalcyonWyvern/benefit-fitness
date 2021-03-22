//rcc
import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar,} from "react-bootstrap";
import bannerLogo2 from '../images/BenefitLogo2.png';
import Facebooky from '../images/Facebook.png'
import Insta from '../images/Insta1.jpg'


class Footer extends Component {
    render() {
        return (
            <div>
                <Navbar className="navbar-light border-top border-primary" fixed="bottom" bg="dark">
                    <Navbar.Brand className="text-primary" as={Link} to="/about">
                        <img
                            alt=""
                            src={bannerLogo2}
                            width="40"
                            height="40"
                            className="d-inline-block align-self-center"
                        /> {' '}
                        BENEFIT FITNESS
                    </Navbar.Brand>
                    <Nav className="ml-auto">
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
                                    width="30"
                                    height="30"
                                />
                            </a>
                            <a target="_blank" href="https://www.instagram.com/benefit.fitness/">
                                {'  '}
                                <img
                                    className="rounded-circle d-inline-block align-self-center"
                                    alt="100x100"
                                    src={Insta}
                                    width="30"
                                    height="30"
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