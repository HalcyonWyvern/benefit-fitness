import React from 'react';
import {Nav, Pagination} from "react-bootstrap";

const RequestsPagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Nav>
            {pageNumbers.map(number => (
                <Pagination onClick={() => paginate(number)}>

                    <Pagination.Item>
                        {number}
                    </Pagination.Item>

                </Pagination>
            ))}
        </Nav>
    )
}

export default RequestsPagination