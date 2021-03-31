import React, {Component} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";

class Plans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            exercises: [],
            trainerExplanation: "",
            type: "",
            exercisePlans: [],
            errors: {}
        };
    }

    // componentDidMount = () => {
    //     this.getPlan();
    //     this.getPlanExercises();
    // }

   componentDidMount() {
       this.getExercisePlans();
    }

    getExercisePlans(){
        axios.get('/api/plans')
            .then((response) => {
                const plans = response.data
                // const planExercises = response.data
                // let forEachData = ''
                // forEach(planExercises, d => forEachData += `<li>${d.exercises.exerciseName}</li>`)

                this.setState({ exercisePlans: plans})

                console.log('Data has been received');
            })
            .catch(() => {
                alert('Error');
            });
    }

    displayPlans = (exercisePlans) => {
        if (!exercisePlans.length) return null;


        return exercisePlans.map((plans, index) =>(
            <div key={index}>
                <h3>{plans.name}</h3>
                {/*<p>Exercises: {plans.exercises}</p>*/}
                {/*<p>Exercises: {plans.exercises}</p>*/}
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