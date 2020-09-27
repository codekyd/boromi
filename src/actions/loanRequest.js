import axios from "axios";
import { CREATE_LOAN_REQ_FAILURE, CREATE_LOAN_REQ_REQUEST, CREATE_LOAN_REQ_SUCCESS, GET_ALL_LOAN_REQ_FAILURE, GET_ALL_LOAN_REQ_REQUEST, GET_ALL_LOAN_REQ_SUCCESS, GET_LOAN_REQ_OF_LOAN_BY_ID_FAILURE, GET_LOAN_REQ_OF_LOAN_BY_ID_REQUEST, GET_LOAN_REQ_OF_LOAN_BY_ID_SUCCESS, UPDATE_LOAN_REQ_BY_ID_FAILURE, UPDATE_LOAN_REQ_BY_ID_REQUEST, UPDATE_LOAN_REQ_BY_ID_SUCCESS } from "./types"

// Dispatches an action to get all loanRequests
export const getAllLoanRequest =() => async dispatch => {
    dispatch({type:GET_ALL_LOAN_REQ_REQUEST})

    try {
        const res = await axios.get('/api/loansRequests');
        dispatch({
            type: GET_ALL_LOAN_REQ_SUCCESS,
            payload: res.data.loanRequests
        })
    } catch (err) {
        dispatch({
            type: GET_ALL_LOAN_REQ_FAILURE,
            payload: err.response.data.loanRequests
        })
    }
}
// Dispatches an action to creates a new loan request
export const createNewLoanRequest = (loanID, loanRequest) => async dispatch => {
    dispatch({type: CREATE_LOAN_REQ_REQUEST})
    try {
        const res = await axios.post(`/api/loans/${loanID}/loanRequests`,loanRequest)
        dispatch({
            type: CREATE_LOAN_REQ_SUCCESS,
            payload: res.data

        })
    } catch (err) {
        dispatch({
            type: CREATE_LOAN_REQ_FAILURE,
            payload: err.response.data
        })
    }
}
// Dispatches an action to  get all the loan requests of a specific loan
export const getLoanRequestsByLoanID = ( loanID ) => async dispatch => {
    dispatch({ type: GET_LOAN_REQ_OF_LOAN_BY_ID_REQUEST });
    try {
        const res = await axios.get(`/api/loans/${loanID}/loanRequests`)
        dispatch({
            type: GET_LOAN_REQ_OF_LOAN_BY_ID_SUCCESS,
            payload: res.data.loanRequests
        })
    } catch (err) {
        dispatch({
            types: GET_LOAN_REQ_OF_LOAN_BY_ID_FAILURE,
            payload: err.response.data
        })
    }
}

// Dispatches an action to  update a specific loan
export const updateLoanRequestByID = ( loanRequestID, loanRequest ) => async dispatch => {
    dispatch({ type: UPDATE_LOAN_REQ_BY_ID_REQUEST })
    try {
        const res = await axios.patch(`/api/loanRequests/${loanRequestID}`,loanRequest)
        console.log(res);
        dispatch({
            type: UPDATE_LOAN_REQ_BY_ID_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: UPDATE_LOAN_REQ_BY_ID_FAILURE,
            payload: err.response.data
        })
    }
}