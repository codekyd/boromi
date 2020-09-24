import axios from "axios"
import * as types from "./types";

//Action to create a new Loan
export const createLoan = ({title,amount,interest, maxPayBack}) => async dispatch => {
    dispatch({type: types.crea})

}