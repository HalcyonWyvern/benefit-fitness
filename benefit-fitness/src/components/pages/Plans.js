import React, {Component, useEffect, useMemo, useState} from "react";
import {Container, Table} from "react-bootstrap";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import PaginationComponent from "./page_components/PaginationComponent";
import Search from "./page_components/Search";

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

   // componentDidMount() {
   //     this.getExercisePlans();
   //  }
   //
   //  getExercisePlans(){
   //      axios.get('/api/plans', {})
   //          .then((response) => {
   //              const plans = response.data
   //              this.setState({ exercisePlans: plans})
   //
   //              console.log('Data has been received');
   //          })
   //          .catch(() => {
   //              alert('Error');
   //          });
   //  }
   //
   //  displayPlans = (exercisePlans) => {
   //      // if (!exercisePlans.length) return null;
   //
   //
   //      return exercisePlans.map((plans, index) =>(
   //          <div key={index}>
   //              <h3>{plans.name}</h3>
   //              <ul><h5>Exercises:</h5> {plans.exercises.map(option =>
   //                  <li>{option.exerciseName}</li>
   //              )}
   //              </ul>
   //              <p><h5>Trainer Explanation:</h5> {plans.trainerExplanation}</p>
   //              <p><h5>Type:</h5> {plans.type}</p>
   //          </div>
   //      ));
   //  };

    render() {

        return (
            <Container>
                <PlansTable/>
            </Container>
        );
    }
}

export default Plans;

const PlansTable = () => {
    const [plans, setPlans] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });


    const ITEMS_PER_PAGE = 1;



    useEffect(() => {
        const getPlans = () => {
            // showLoader();

            axios.get('/api/plans')
                .then((response) => {
                    const plan = response.data
                    // this.setState({ choices: exercise})
                    setPlans(plan);
                    console.log('Data has been received');
                })
                .catch(() => {
                    alert('Error');
                });
        };

        getPlans();
    }, []);

    const clickHandler = () => {

    }

    const planData = useMemo(() => {
        let computedPlans = plans;

        if (search) {
            computedPlans = computedPlans.filter(
                data =>
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.type.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedPlans.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedPlans = computedPlans.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedPlans.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [plans, currentPage, search, sorting]);

    return (
        <>
            <h3>Find Exercises Here</h3>
            <div >
                <div >
                    <div>
                        <div>
                            <PaginationComponent
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div>
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Plan Name</th>
                            <th>Plan Type</th>
                            <th>Exercises</th>
                        </tr>
                        {/*headers={headers}*/}
                        {/*onSorting={(field, order) =>*/}
                        {/*    setSorting({ field, order })*/}
                        {/*}*/}
                        </thead>
                        <tbody>
                        {planData.map(plan => (
                            <tr key={plan._id}>
                                <td>{plan.name}</td>
                                <td>{plan.type}</td>
                                <td>{plan.exercises.map(option =>
                                    <>({option.exerciseName}) {' '}</>
                                )}
                                </td>

                                {/*<td>{plan.equipment}</td>*/}
                                {/*<td>{name.body}</td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};