import React, { useEffect, useMemo, useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const BackToDashButton = () => {
    return(
        <>
            <Button as={Link} to="/admin">Back to Dashboard</Button>
        </>
    );
};

export default BackToDashButton;