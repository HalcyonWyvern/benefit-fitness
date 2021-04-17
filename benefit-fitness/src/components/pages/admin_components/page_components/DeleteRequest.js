import React from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

const DeleteRequest = ({ requestID, URI}) => {

    const deleteRequest = async () => {
        await axios
            .delete(URI + requestID)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        //Refreshes the page to show new data
        window.location.reload(false);
    }

    return(
        <Button variant="danger" onClick={deleteRequest} className="ml-2">Delete</Button>
    )
}

export default DeleteRequest