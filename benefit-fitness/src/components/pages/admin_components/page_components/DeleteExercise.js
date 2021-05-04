import React from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

const DeleteExercise = ({ requestID, URI, exerciseName}) => {

    const deleteRequest = async () => {
        const body = {
            exercise: exerciseName
        }

        await axios
            .patch('/api/plans/auto', body)
            .then(res => {
                console.log("Deleted exercise from plans.")
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })


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
        <Button variant="outline-danger" onClick={deleteRequest} className="ml-2">Delete</Button>
    )
}

export default DeleteExercise;