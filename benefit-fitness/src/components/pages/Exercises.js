import React, {Component, useEffect, useMemo, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";
import PaginationComponent from "./page_components/PaginationComponent"
import Search from "./page_components/Search";
import ReactPlayer from "react-player/lazy";


class Exercises extends Component {


    render() {
        return (

            <>
                <Container style={{marginBottom: '20rem', marginTop: '2.5rem'}}>
                    <h2>Exercise Library</h2>
                    <ExerciseTable />
                </Container>
            </>

        );


    }

}


export default Exercises;

const ExerciseTable = () => {
    const [names, setNames] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    // const [clicked, setClicked] = useState([]);
    const [exerciseShown, setExerciseShown] = useState([]);

    const ITEMS_PER_PAGE = 12;



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

                        <Table responsive striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th style={{fontSize: "1.35rem"}}>Exercise Name</th>
                                <th style={{fontSize: "1.35rem"}}>Exercise Type</th>
                                <th style={{fontSize: "1.35rem"}}>Equipment</th>
                                <th style={{fontSize: "1.35rem",textAlign: "center"}}>More Info</th>
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
                                    <td style={{verticalAlign: "middle"}}><h5>{name.exerciseName}</h5></td>
                                    <td style={{fontSize: "1.30rem"}}>{name.exerciseType}</td>
                                    <td style={{fontSize: "1.30rem"}}>{name.equipment}</td>
                                    <td colSpan="0" style={{textAlign: "center"}}><Button size="sm" variant="primary" onClick={() => toggleShown(name.exerciseName)}>Toggle Details</Button></td>
                                </tr>
                                    {exerciseShown.includes(name.exerciseName) && (
                                        <>
                                        <tr>
                                            <td style={{fontSize: "1.20rem"}} colSpan="4"><h5>Instructions:</h5>{name.instructions}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4"><h5>Video Example:</h5> <a target="_blank"><ReactPlayer controls={true} url={name.videoURL}/></a> </td>
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

