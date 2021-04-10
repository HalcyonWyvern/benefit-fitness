import React, {Component, useEffect, useMemo, useState} from "react";
import { Container, Row, Table} from "react-bootstrap";
import axios from "axios";
import PaginationComponent from "./page_components/PaginationComponent"
import Search from "./page_components/Search";


class Exercises extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseName: "",
            equipment: "",
            reps: "",
            sets: "",
            exerciseType: "",
            videoURL: "",
            instructions: "",
            choices: [],
            errors: {}
        };
    }

    render() {
        return (

            <>
                <Container className="pt-5">
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

    const ITEMS_PER_PAGE = 2;



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


        const clickExercise = (name) => {

            console.log(name)
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
                                <th>Exercise Name</th>
                                <th>Exercise Type</th>
                                <th>Equipment</th>
                            </tr>
                            {/*headers={headers}*/}
                            {/*onSorting={(field, order) =>*/}
                            {/*    setSorting({ field, order })*/}
                            {/*}*/}
                            </thead>
                            <tbody>
                            {exerciseData.map(name => (
                                <tr key={name._id}>
                                    <td>{name.exerciseName}</td>
                                    <td>{name.exerciseType}</td>
                                    <td>{name.equipment}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                    </div>
                </div>
        </>
    );
};

