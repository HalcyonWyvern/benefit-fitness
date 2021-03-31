import React, {Component} from "react";
import {Button, Col, Container, Image, Jumbotron, Row} from "react-bootstrap";
import logo from "../images/BenefitLogo2.png";
import {Link} from "react-router-dom";

class About extends Component {

    render() {
        return (
            <Container>
                <p>{' '}</p>
                <Jumbotron>
                    <h1>Questions About Training?</h1>
                    <p>
                        Send us a request through our Contact page and we'll try to help you to the best of our
                        abilities!
                    </p>
                    <Button as={Link} to="/contact">
                        Contact Us
                    </Button>

                </Jumbotron>
                <Row>
                    <Col>

                        <h1>
                            About Benefit Fitness!
                        </h1>
                        <p>{' '}</p>
                        <p>
                            Officially started in 2019, Benefit Fitness is a non-profit organization that
                            offers fitness classes to individuals with lower household income in order to
                            improve their overall health and wellness. Twenty percent of all profits go to
                            other St. Louis area non-profit organizations that are in need of assistance
                            and funding to improve their local communities. Our owner, Samuel
                            Youngblood is the sole owner and operator of the non-profit organization.
                        </p>
                        <p>
                            Benefit Fitness caters to a variety of people from differing backgrounds and
                            communities across the St. Louis area. Our goal is to help our clients cultivate
                            a holistic understanding of health and wellness through our services.
                        </p>
                        <h3>
                            What is Sturgeon?
                        </h3>
                        <p>{' '}</p>
                        <p>
                            Sturgeon is our solution to online exercise assistance and assists us with
                            showcasing our workout plans to our wide-array of clients. We understand that
                            different people have differing needs, so instead of calling one of our
                            trainers we hope to give everyone the resources to succeed inside this application.
                        </p>
                        <p>
                            This service includes a library of exercises and plans that we personally
                            recommend to our clients in our personal training sessions. Alongside that,
                            our request system allows for us to get a better understanding of you and the
                            goals you hope to reach with our services.
                        </p>
                    </Col>
                    <Col xs={6} md={5}>
                        <Image src={logo} fluid/>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
        );
    }
}

export default About;