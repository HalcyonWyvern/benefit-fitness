import React, {useEffect, useMemo, useState} from "react";
import {Card, Col, Form, ListGroup, Row, Spinner} from "react-bootstrap";
import axios from "axios";
import DeleteRequest from "./DeleteRequest"
//import PaginationComponent from "../../page_components/PaginationComponent";
import Pagination from '@material-ui/lab/Pagination';

export default function RequestsTable () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(1);

    useEffect(() => {
        const getFunc = async () => {
            setLoading(true);
            await axios
                .get('/api/requests')
                .then(res => {
                    setData(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                });
            setLoading(false);
        }

        getFunc();
    }, []);

    if (loading) {
        return (
            <Spinner animation="border">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

    // //Change page
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return(
        <>
            <Row>
                <Col>
                    {/*<PaginationComponent
                        total={data.length}
                        itemsPerPage={postsPerPage}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />*/}
                    <Pagination
                        style={{backgroundColor: "white", boxShadow: "none",}}
                        count={data.length}
                        boundaryCount={2}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            {currentPosts.map(data =>
                <Card style={{width: '150rem', height: '40rem'}}>
                    <Card.Header>
                        <Row>
                        <Col>
                        <h3>Form Submitted by: {data.user.username}</h3>
                        </Col>
                        <Col sm={2}>
                        <DeleteRequest requestID={data._id} URI='/api/requests/'/>
                        </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={5}>
                                <h5>User Information</h5>
                                <ListGroup>


                                            <ListGroup.Item>Username: {data.user.username}</ListGroup.Item>
                                            <ListGroup.Item>Name: {data.user.firstName + ' ' + data.user.lastName}</ListGroup.Item>
                                            <ListGroup.Item>Email: {data.user.email}</ListGroup.Item>
                                            <ListGroup.Item>Phone: {data.phoneNumber}</ListGroup.Item>

                                </ListGroup>
                            </Col>
                            <Col sm={7}>
                                <h5>User Address Information</h5>
                                <ListGroup>


                                            <ListGroup.Item>Address: {data.user.address}</ListGroup.Item>
                                            <ListGroup.Item>City: {data.user.city}</ListGroup.Item>
                                            <ListGroup.Item>State: {data.user.state}</ListGroup.Item>
                                            <ListGroup.Item>Zip: {data.user.zip}</ListGroup.Item>

                                </ListGroup>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={5}>
                                <h5>Contact Form Body</h5>
                                <ListGroup>


                                    <ListGroup.Item>Preferred Contact Method: {data.contactMethod}</ListGroup.Item>
                                    <ListGroup.Item>Request Type: {data.requestType}</ListGroup.Item>


                                </ListGroup>
                            </Col>
                            <Col sm={7}>
                                <h5>
                                    Message Body submitted {data.requestedDate.slice(0,10)}
                                </h5>
                                <Form>
                                    <Form.Group>

                                        <Form.Control readOnly value={data.comments} id="comments" as="textarea" rows={4}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </>
    )
};

//export default RequestsTable;