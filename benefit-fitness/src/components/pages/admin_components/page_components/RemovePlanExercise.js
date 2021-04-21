import React, {Component, useState} from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";

class RemovePlanExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exerciseName: this.props.exerciseName || ""
        }
    }

    deleteEntry = async () => {
        const newRequest = {
            exerciseName: this.state.exerciseName
        }
        console.log(newRequest)

        await axios
            .put('/api/plans/remove/' + this.props.planID, newRequest)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        window.location.reload(false);
    }

    render() {
        return(
        <Button variant="outline-danger" onClick={this.deleteEntry}>Remove {this.props.exerciseName}</Button>
        )
    }

}

export default RemovePlanExercise;