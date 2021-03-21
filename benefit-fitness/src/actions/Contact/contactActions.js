import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {GET_ERRORS} from "../types";

export const sendRequest = reqData => dispatch => {
    axios
        .post("api/requests/", reqData)
        .then(res => {
            console.log(res)
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}