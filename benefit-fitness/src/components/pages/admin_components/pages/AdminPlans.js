import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import AddPlan from "../page_components/AddPlan";
import axios from "axios";
import PaginationComponent from "../../page_components/PaginationComponent";
import Search from "../../page_components/Search";
import BackToDashButton from "../page_components/BackToDashButton";
import DeleteRequest from "../page_components/DeleteRequest"
import AddPlanExercises from "../page_components/AddPlanExercises";
import UpdatePlan from "../page_components/UpdatePlan"
import RemovePlanExercise from "../page_components/RemovePlanExercise";
import AdminPlanHelp from "../../page_components/HelpModals/AdminPlanHelp";

class AdminPlans extends Component {

    render() {
        return (
            <Container style={{paddingBottom: "18rem"}}>
                <p>{' '}</p>
                <BackToDashButton/>
                <p>{' '}</p>
                <PlansTable/>
            </Container>
        );
    }
}
export default AdminPlans;
const PlansTable = () => {
    const [plans, setPlans] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [planShown, setPlanShown] = useState([]);


    const ITEMS_PER_PAGE = 6;

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
                    data.type.toLowerCase().includes(search.toLowerCase()) ||
                    data.tag.toLowerCase().includes(search.toLowerCase())
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
            <h3>Find Plans Here <AdminPlanHelp/></h3>
            <div >
                <div >
                    <Row>
                        <Col>
                            <PaginationComponent
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </Col>
                        <Col sm={2}>
                            <br/>
                            <br/>
                            <br/>
                            <AddPlan/>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Plan Name</th>
                            <th>Plan Type</th>
                            <th>Tags</th>
                            <th>More Options</th>
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
                                    <td>{plan.tag}</td>
                                    <td colSpan="0">
                                        <Button variant="primary" className="ml-2" onClick={() => toggleShown(plan.name)}>
                                            Toggle Details
                                        </Button>
                                        <UpdatePlan
                                            name={plan.name}
                                            planID={plan._id}
                                            type={plan.type}
                                            explanation={plan.trainerExplanation}
                                            tag={plan.tag}
                                        />
                                        <DeleteRequest requestID={plan._id} URI='/api/plans/'/>
                                    </td>
                                </tr>
                                {planShown.includes(plan.name) && (
                                    <>
                                        <tr>
                                            <td colSpan="4"><h5>Trainer Explanation:</h5>{plan.trainerExplanation}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4"><h5>Exercises:</h5> {plan.exercises.map(option =>
                                                <Row>
                                                    <Col sm={8}>
                                                    <ListGroup as="ul">
                                                        <ListGroup.Item>Exercise: {option.exerciseID.exerciseName}, {' '} Sets: {option.sets}, {' '} Reps: {option.reps}, {' '} Time: {option.time}</ListGroup.Item>
                                                    </ListGroup>
                                                    </Col >
                                                    <Col sm={4}>
                                                        <RemovePlanExercise planID={plan._id} exerciseName={option.exerciseID.exerciseName}/>
                                                    </Col>
                                                </Row>
                                            )}

                                            <br/>
                                                <AddPlanExercises
                                                    planID={plan._id}
                                                    planExs={plan.exercises}
                                                    name={plan.name}
                                                    type={plan.type}
                                                />

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