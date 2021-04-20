import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Row, Spinner} from "react-bootstrap";

const UserTable = () => {
    const [userData, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    useEffect(() =>{
        const getUsers = async () => {
            setLoading(true);
            await axios
                .get('/api/users')
                .then(res => {
                    setData(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
            setLoading(false);
        }

        getUsers();
    }, [])

    if (loading) {
        return (
            <Spinner animation="border">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    return(
        <>
            <Row>
                <Col>

                </Col>
            </Row>
        </>
    )
}

export default UserTable;