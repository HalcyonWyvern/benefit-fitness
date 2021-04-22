import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spinner} from "react-bootstrap";
import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';


const UserTable = () => {
    const [userData, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const getUsers = async () => {
            setLoading(true);
            await axios
                .get('/api/users')
                .then(res => {
                    setData(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
            setLoading(false);
        }

        getUsers();
    }, [])


    if (loading) {
        return (
            <Spinner animation="border">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    const columns: GridColDef[] = [
        {field: "username", headerName: 'Username', width: 200},
        {field: "email", headerName: "Email", width: 250},
        {field: "firstName", headerName: "First Name", width: 150},
        {field: "lastName", headerName:"Last Name", width: 150},
        {field: "city", headerName: "City", width: 150},
        {field: "state", headerName: "State", width: 150}
    ]



    return(
        <>

            <DataGrid
                getRowId={(row) => row._id}
                columns={columns}
                rows={userData}
                pageSize={10}
                rowsPerPageOptions={[10, 15]}
                components={{
                    Toolbar: GridToolbar,
                }}
            />





            {/*<Table responsive hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                {userData.map(user => (
                   <tr key={user._id}>
                       <td>{user.username}</td>
                       <td>{user.email}</td>
                       <td>{user.firstName}</td>
                       <td>{user.lastName}</td>
                   </tr>
                ))}
                </tbody>
            </Table>*/}
        </>
    )
}

export default UserTable;