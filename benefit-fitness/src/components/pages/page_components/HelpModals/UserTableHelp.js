import React from 'react';
import {Button, Modal} from "react-bootstrap";

const UserTableHelp = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return(
        <>
            <Button variant="outline-success" onClick={handleOpen}>How do I use this?</Button>
            <Modal
                size="md"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: 0,
                    boxShadow: "none",
                }}
                scrollable
                show={open}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>The User Table</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                    <h4>User Table Information</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The user table displays all currently registered users within the system and
                        lists their name, username, and simple address information.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        Columns are labelled by their attribute fields with Username being the single
                        unique field on the table.
                    </p>
                    <h4>Filtering and Hiding Data</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Hiding Columns: </strong>In order to hide columns select "COLUMNS" at the top of
                        the table and use the provided selector to select which columns to include or exclude. When columns
                        are not activated, they are hidden from the table and not included in any CSV exports.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>Filtering Columns: </strong>In order to filter columns, select "FILTERS" at the top of the
                        table and select which column to filter. Once the column is selected, you may type which value
                        to search in the right-most field.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        <strong>In-Table Filtering: </strong>In-table filtering provides an alternative to the normal
                        filtering tool at the top of the user table. In order to access this type of filter, use the
                        dropdown next to the column of your choice.
                    </p>
                    <h4>CSV Export</h4>
                    <p style={{fontSize: "1.15rem"}}>
                        The User table provides functionality for exporting all data to an CSV file that can be read
                        with common applications such as Microsoft Excel.
                    </p>
                    <p style={{fontSize: "1.15rem"}}>
                        During CSV exports, only columns that are not hidden will be exported by the tool. All filters and
                        searches will still apply to the export file.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserTableHelp;