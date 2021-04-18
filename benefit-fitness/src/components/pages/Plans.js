import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Container, ListGroup, Table} from "react-bootstrap";
import axios from "axios";
import PaginationComponent from "./page_components/PaginationComponent";
import Search from "./page_components/Search";
import ExerciseModal from "./page_components/ExerciseModal";

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
    const [planShown, setPlanShown] = useState([]);
    const [showState, setShowState] = useState("");


    const ITEMS_PER_PAGE = 2;



    useEffect(() => {
        const getPlans = () => {
            // showLoader();

            axios.get('/api/plans')
                .then((response) => {
                    const plan = response.data
                    // this.setState({ choices: exercise})
                    setPlans(plan);
                    console.log(response.data);
                })
                .catch(() => {
                    alert('Error');
                });
        };

        getPlans();
    }, []);

    const toggleShown = name => {
        //slice method to return selected elements as new array object
        const shownState = planShown.slice();
        //indexOf to search array for specified item
        const index = shownState.indexOf(name);
        // if item found remove item
        if(index >= 0) {
            // splice adds/removes item
            // 1 means remove one item if found
            shownState.splice(index, 1);
            setPlanShown(shownState);
        }
        else {
            shownState.push(name);
            setPlanShown(shownState);
        }
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

    const hideThis = () => {
        setShowState("");
    }

    function showThis(id) {
        setShowState(id);
    }

    return (
        <>
            <h3>Find Plans Here</h3>
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
                            <th>Tags</th>
                            <th>More Info</th>
                        </tr>
                        {/*headers={headers}*/}
                        {/*onSorting={(field, order) =>*/}
                        {/*    setSorting({ field, order })*/}
                        {/*}*/}
                        </thead>
                        <tbody>
                        {planData.map(plan => (
                            <>
                            <tr key={plan._id}>
                                <td>{plan.name}</td>
                                <td>{plan.type}</td>
                                <td>{' '}</td>
                                <td colSpan="0"><Button variant="primary" onClick={() => toggleShown(plan.name)}>Toggle Details</Button></td>
                            </tr>
                                {planShown.includes(plan.name) && (
                                    <>
                                        <tr>
                                            <td colSpan="4"><h5>Trainer Explanation:</h5>{plan.trainerExplanation}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4"><h5>Exercises:</h5> {plan.exercises.map(option =>
                                                <ListGroup as="ul">
                                                    <ListGroup.Item action onClick={() => showThis(option._id)}>{option.exerciseName}</ListGroup.Item>
                                                    <ExerciseModal exerciseData={option} showState={(showState === option._id)} hideModal={hideThis}/>
                                                </ListGroup>
                                            )}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};