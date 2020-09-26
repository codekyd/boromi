import axios from "axios"
import * as types from "./types";

//Action to create a new Loan
export const createLoan = ({title,amount,interest, maxPayBack}) => async dispatch => {
    dispatch({type: types.CREATE_NEW_LOAN_REQUEST})
    try {
        const res = await axios.post("/api/loans", {
            title,
            amount,
            interest,
            maxPayBack
        })
        dispatch({
            type: types.CREATE_NEW_LOAN_SUCCESS,
            payload: res.data
         })

    } catch (err) {
        dispatch({
            type: types.CREATE_NEW_LOAN_FAILURE,
            payload: err.response.data
        })

    }

}
//Action to get All Loans
export const getAllLoans = () => async dispatch => {
    console.log("Here...............");
    dispatch({ type: types.GET_ALL_LOANS_REQUEST })
    try {
        const res = await axios.get("/api/loans")
        console.log(res.data);
        dispatch({
            type: types.GET_ALL_LOANS_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: types.GET_ALL_LOANS_SUCCESS,
            payload: err.response.data
        })
    }
}
// Action to get a loan by ID
export const getLoanByID = (loanID) => async dispatch => {
    dispatch({ type: types.GET_LOAN_BY_ID_REQUEST });
    try {
        const res = await axios.get(`/api/loans/${loanID}`)
        dispatch({
            type: types.GET_LOAN_BY_ID_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: types.GET_LOAN_BY_ID_FAILURE,
            payload: err.response.data
        })
    }
}
//Action to Update a loan
export const updateLoanByID = ( loanData, loanID ) => async dispatch => {
    dispatch({ type: types.UPDATE_LOAN_BY_ID_REQUEST })
    try {
        const res = await axios.patch(`/api/loans/${loanID}`,loanData)
        dispatch({
            type: types.UPDATE_LOAN_BY_ID_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: types.UPDATE_LOAN_BY_ID_FAILURE,
            payload: err.response.data
        })
    }
}
//Action to Delete a loan
export const deleteLoanByID = ( loanID ) => async dispatch => {
    dispatch({ type: types.DELETE_LOAN_BY_ID_REQUEST })
    try {
         await axios.delete(`/api/loans/${loanID}`)
        dispatch({
            type: types.DELETE_LOAN_BY_ID_SUCCESS,
            payload: loanID
        })
    } catch (err) {
        dispatch({
            type: types.DELETE_LOAN_BY_ID_FAILURE,
            payload: err.response.data
        })
    }
}


