import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import AddExercise from "../page_components/AddExercise"
import axios from "axios";
import PaginationComponent from "../../page_components/PaginationComponent";
import BackToDashButton from "../page_components/BackToDashButton"
import Search from "../../page_components/Search";
import UpdateExercise from "../../admin_components/page_components/UpdateExercise";
import AdminExercisesHelp from "../../page_components/HelpModals/AdminExercisesHelp";
import DeleteExercise from "../page_components/DeleteExercise";

class AdminExercises extends Component {

    render() {
        return (
            <Container style={{paddingBottom: "10rem"}}>
                <p>{' '}</p>
                <BackToDashButton/>
                <p>{' '}</p>
                <ExerciseTable />
            </Container>
        );
    }
}
export default AdminExercises;

const ExerciseTable = () => {
    const [names, setNames] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting] = useState({ field: "", order: "" });
    // const [clicked, setClicked] = useState([]);
    const [exerciseShown, setExerciseShown] = useState([]);

    const ITEMS_PER_PAGE = 10;



    useEffect(() => {
        const getExercises = () => {
            // showLoader();

            axios.get('/api/exercises')
                .then((response) => {
                    const exercise = response.data
                    // this.setState({ choices: exercise})
                    setNames(exercise);
                    console.log('Data has been received');
                })
                .catch(() => {
                    alert('Error');
                });
        };

        getExercises();
    }, []);


    const toggleShown = exerciseName => {
        //slice method to return selected elements as new array object
        const shownState = exerciseShown.slice();
        //indexOf to search array for specified item
        const index = shownState.indexOf(exerciseName);
        // if item found remove item
        if(index >= 0) {
            // splice adds/removes item
            // 1 means remove one item if found
            shownState.splice(index, 1);
            setExerciseShown(shownState);
        }
        else {
            shownState.push(exerciseName);
            setExerciseShown(shownState);
        }
    }



    const exerciseData = useMemo(() => {
        let computedNames = names;

        if (search) {
            computedNames = computedNames.filter(
                data =>
                    data.exerciseName.toLowerCase().includes(search.toLowerCase()) ||
                    data.exerciseType.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedNames.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedNames = computedNames.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedNames.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [names, currentPage, search, sorting]);

    return (
        <>
            <h2>Exercise Management <AdminExercisesHelp/></h2>
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
                                placeholder="Search by Name or Type"
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
                            <AddExercise/>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th style={{fontSize: "1.35rem"}}>Exercise Name</th>
                            <th style={{fontSize: "1.35rem"}}>Exercise Type</th>
                            <th style={{fontSize: "1.35rem"}}>Equipment</th>
                            <th style={{fontSize: "1.35rem"}}>More Options</th>
                        </tr>
                        {/*headers={headers}*/}
                        {/*onSorting={(field, order) =>*/}
                        {/*    setSorting({ field, order })*/}
                        {/*}*/}
                        </thead>
                        <tbody>
                        {exerciseData.map(name => (
                            <>
                                <tr key={name._id}>
                                    <td style={{fontSize: "1.25rem"}}>{name.exerciseName}</td>
                                    <td style={{fontSize: "1.25rem"}}>{name.exerciseType}</td>
                                    <td style={{fontSize: "1.25rem"}}>{name.equipment}</td>
                                    <td colSpan="0">
                                        <Button variant="primary" className="ml-2" onClick={() => toggleShown(name.exerciseName)}>
                                        Toggle Details
                                        </Button>
                                        <UpdateExercise
                                            exerciseID={name._id}
                                            name={name.exerciseName}
                                            equipment={name.equipment}
                                            type={name.exerciseType}
                                            video={name.videoURL}
                                            instructions={name.instructions}
                                            sets={name.sets}
                                            reps={name.reps}
                                        />
                                        {/*<Button variant="success" className="ml-2" onClick={UpdateExercise}>*/}
                                        {/*    Update Exercise*/}
                                        {/*</Button>*/}
                                        <DeleteExercise requestID={name._id} URI='/api/exercises/' exerciseName={name.exerciseName}/>
                                    </td>
                                </tr>
                                {exerciseShown.includes(name.exerciseName) && (
                                    <>
                                        <tr>
                                            <td colSpan="4" style={{fontSize: "1.35rem"}}><h5>Instructions:</h5>{name.instructions}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" style={{fontSize: "1.35rem"}}><h5>Video Link:</h5> <a target="_blank" href={name.videoURL}>{name.videoURL}</a> </td>
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