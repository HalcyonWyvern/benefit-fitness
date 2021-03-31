import React, {Component} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";

class Plans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // _id: "",
            name: "",
            exercises: [],
            trainerExplanation: "",
            type: "",
            exercisePlans: [],
            errors: {}
        };
    }

    componentDidMount = () => {
        this.getPlan();
        // this.getPlanExercises();
    }

    getPlan = () => {
        axios.get('/api/plans')
            .then((response) => {
                const plans = response.data
                this.setState({ exercisePlans: [plans]})

                console.log('Data has been received');
            })
            .catch(() => {
                alert('Error');
            });
    }

    // getPlanExercises = () => {
    //     axios.get('/api/plans/exercises')
    //         .then((response) =>{
    //             const names =response.data
    //             this.setState({exercises: [names]})
    //
    //             console.log('Exercise names received');
    //         })
    //         .catch(() =>{
    //             alert('Error retrieving exercise names');
    //         });
    // }


    // displayPlanExercises = (exercises) => {
    //     if (!exercises.length) return null;
    //
    //     return exercises.map(([names, index]) =>(
    //         <p>Exercises: {names.exerciseName}</p>
    //     ))
    // }

    displayPlans = (exercisePlans) => {
        if (!exercisePlans.length) return null;

        return exercisePlans.map(([plans, index]) =>(
            <div key={index}>
                <h3>{plans.name}</h3>
                <p>Exercises: {plans.exercises}</p>
                {/*{this.displayPlanExercises(this.state.exercises)}*/}
                <p>Trainer Explanation: {plans.trainerExplanation}</p>
                <p>Type: {plans.type}</p>


            </div>
        ));
    };

    render() {
        return (
            <Container>
                <div className="plans">
                    {this.displayPlans(this.state.exercisePlans)}
                </div>
            </Container>
        );
    }
}

export default Plans;