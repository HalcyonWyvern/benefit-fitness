import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Container, Nav, Row, Table} from "react-bootstrap";
import axios from "axios";

const RequestsTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getFunc = () => {
            axios
                .get('/api/requests')
                .then(res => {
                    setData(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }

        getFunc();
    }, []);


    return(
        <>

        </>
    );
};

export default RequestsTable;