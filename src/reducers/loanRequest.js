import {
    CREATE_LOAN_REQ_FAILURE, CREATE_LOAN_REQ_REQUEST,
    CREATE_LOAN_REQ_SUCCESS,
    GET_ALL_LOAN_REQ_FAILURE,
    GET_ALL_LOAN_REQ_REQUEST,
    GET_ALL_LOAN_REQ_SUCCESS,
    GET_LOAN_REQ_OF_LOAN_BY_ID_FAILURE,
    GET_LOAN_REQ_OF_LOAN_BY_ID_REQUEST,
    GET_LOAN_REQ_OF_LOAN_BY_ID_SUCCESS,
    UPDATE_LOAN_REQ_BY_ID_FAILURE,
    UPDATE_LOAN_REQ_BY_ID_REQUEST,
    UPDATE_LOAN_REQ_BY_ID_SUCCESS
} from "../actions/types";

const initialState = {
    loading: false,
    allLoanRequests: [],
    successMsg: '',
    error:''
}
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_LOAN_REQ_REQUEST:
        case GET_ALL_LOAN_REQ_REQUEST:
        case GET_LOAN_REQ_OF_LOAN_BY_ID_REQUEST:
        case UPDATE_LOAN_REQ_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_LOAN_REQ_SUCCESS:
            return {
                ...state,
                loading: false,
                successMsg: payload,
                error: ''
            }
        case GET_ALL_LOAN_REQ_SUCCESS:
            return {
                ...state,
                loading: false,
                allLoanRequests:payload,
                singleLoanRequest: null,
                successMsg: '',
                error: ''
            }
            case GET_LOAN_REQ_OF_LOAN_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    allLoanRequests: payload,
                    error: ''
                }
            case UPDATE_LOAN_REQ_BY_ID_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    singleLoanRequest: null,
                    successMsg: payload,
                    error: ''
                }
            case GET_ALL_LOAN_REQ_FAILURE:
            case GET_LOAN_REQ_OF_LOAN_BY_ID_FAILURE:
            case CREATE_LOAN_REQ_FAILURE:
            case UPDATE_LOAN_REQ_BY_ID_FAILURE:
                return {
                    ...state,
                    singleLoanRequest: null,
                    allLoanRequests: null,
                    successMsg: '',
                    error: payload
                }
        default:
            return state ;
    }
}