import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Container, ListGroup, OverlayTrigger, Popover, Table} from "react-bootstrap";
import axios from "axios";
import PaginationComponent from "./page_components/PaginationComponent";
import Search from "./page_components/Search";
import ExerciseModal from "./page_components/ExerciseModal";
import UserPlanHelp from "./page_components/HelpModals/UserPlanHelp";

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
            <Container  style={{marginBottom: '20rem', marginTop: '2.5rem'}}>
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

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const getPlans = () => {
            // showLoader();

            axios.get('/api/plans')
                .then((response) => {
                    const plan = response.data
                    // this.setState({ choices: exercise})
                    setPlans(plan);
                    console.log(plan);
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

    const hideThis = () => {
        setShowState("");
    }

    function showThis(id) {
        setShowState(id);
    }

    const formatTag = (tag) => {
        if(tag === "") {
            return "None Specified"
        } else {
            return tag
        }
    }

    return (
        <>
            <h2>Plan Library <UserPlanHelp/></h2>
            <div>
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
                            <th style={{fontSize: "1.35rem"}}>Plan Name</th>
                            <th style={{fontSize: "1.35rem"}}>Plan Type</th>
                            <th style={{fontSize: "1.35rem"}}>Tags</th>
                            <th style={{fontSize: "1.35rem"}}>More Info</th>
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
                                <td style={{fontSize: "1.30rem"}}>{plan.name}</td>
                                <td style={{fontSize: "1.30rem"}}>{plan.type}</td>
                                <td style={{fontSize: "1.30rem"}}>
                                    <OverlayTrigger trigger="click" placement="top" overlay={
                                        <Popover id="popover-basic">
                                            <Popover.Title style={{fontSize: "1.25rem"}} as="h2">Plan tags</Popover.Title>
                                            <Popover.Content style={{fontSize: "1.15rem"}}>
                                                {formatTag(plan.tag)}
                                            </Popover.Content>
                                        </Popover>
                                    }>
                                        <Button variant="outline-success">View Tags</Button>
                                    </OverlayTrigger>
                                </td>
                                <td colSpan="0"><Button variant="primary" onClick={() => toggleShown(plan.name)}>Toggle Details</Button></td>
                            </tr>
                                {planShown.includes(plan.name) && (
                                    <>
                                        <tr>
                                            <td style={{fontSize: "1.20rem"}} colSpan="4"><h5>Trainer Explanation:</h5>{plan.trainerExplanation}</td>
                                        </tr>
                                        <tr>
                                            <td style={{fontSize: "1.20rem"}} colSpan="4"><h5>Exercises:</h5> {plan.exercises.map(option =>

                                                <ListGroup as="ul">
                                                    <ListGroup.Item action onClick={() => showThis(option._id)}><h5>{option.exerciseID.exerciseName}</h5> {' '} Sets: {option.sets}, {' '} Reps: {option.reps}, {' '} Time: {option.time}</ListGroup.Item>
                                                    <ExerciseModal exerciseData={option.exerciseID} showState={(showState === option._id)} hideModal={hideThis} sets={option.sets} reps={option.reps} time={option.time}/>
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