//rcc
import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar,} from "react-bootstrap";
import bannerLogo2 from '../images/BenefitLogo2.png';
import Tweety from '../images/Tweety1.png';
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
                            Phone: (314)-xxx-xxxx
                        </Nav.Item>
                        <Link className="pl-3">
                            Email: admin@gmail.com
                        </Link>
                        <Nav.Item className="pl-3">
                            Follow us:
                            <Link>
                                {'  '}
                                <img
                                    className="rounded-circle  d-inline-block align-self-center"
                                    alt="100x100"
                                    src={Tweety}
                                    width="30"
                                    height="30"
                                />
                            </Link>
                            <Link>
                                {'  '}
                                <img
                                    className="rounded d-inline-block align-self-center"
                                    alt="100x100"
                                    src={Insta}
                                    width="30"
                                    height="30"

                                />
                            </Link>
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