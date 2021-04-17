import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import AddExercise from "../page_components/AddExercise"
import axios from "axios";
import PaginationComponent from "../../page_components/PaginationComponent";
import BackToDashButton from "../page_components/BackToDashButton"
import Search from "../../page_components/Search";
import UpdateExercise from "../../admin_components/page_components/UpdateExercise";
import DeleteRequest from "../page_components/DeleteRequest";

class AdminExercises extends Component {

    render() {
        return (
            <Container>
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
    const [sorting, setSorting] = useState({ field: "", order: "" });
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
            <h3>Find Exercises Here</h3>
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
                        <Col>
                            <AddExercise/>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Exercise Name</th>
                            <th>Exercise Type</th>
                            <th>Equipment</th>
                            <th>More Options</th>
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
                                    <td >{name.exerciseName}</td>
                                    <td>{name.exerciseType}</td>
                                    <td>{name.equipment}</td>
                                    <td colSpan="0">
                                        <Button variant="primary" className="ml-2" onClick={() => toggleShown(name.exerciseName)}>
                                        Toggle Details
                                        </Button>
                                        <UpdateExercise/>
                                        {/*<Button variant="success" className="ml-2" onClick={UpdateExercise}>*/}
                                        {/*    Update Exercise*/}
                                        {/*</Button>*/}
                                        <DeleteRequest requestID={name._id} URI='/api/exercises/'/>
                                    </td>
                                </tr>
                                {exerciseShown.includes(name.exerciseName) && (
                                    <>
                                        <tr>
                                            <td colSpan="4"><h5>Instructions:</h5>{name.instructions}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4"><h5>Video Link:</h5> <a target="_blank" href={name.videoURL}>{name.videoURL}</a> </td>
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