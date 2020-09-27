import * as types from "../actions/types";
const initialState = {
    loading: false,
    allLoanRequest: {},
    singleLoanRequest: null,
    successMsg: '',
    error:''
}
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.CREATE_LOAN_REQ_REQUEST:
        case types.GET_ALL_LOAN_REQ_REQUEST:
        case types.GET_LOAN_REQ_BY_ID_REQUEST:
        case types.UPDATE_LOAN_REQ_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.CREATE_LOAN_REQ_SUCCESS:
        case types.UPDATE_LOAN_REQ_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                successMsg: payload,
                error: ''
            }
        case types.GET_ALL_LOAN_REQ_SUCCESS:
            return {
                ...state,
                allLoanRequest: {...state.allLoanRequest, payload},
                singleLoanRequest: null,
                successMsg: '',
                error: ''
            }
            case types.GET_LOAN_REQ_BY_ID_SUCCESS:
                return {
                    ...state,
                    singleLoanRequest: payload,
                    allLoanRequest: {},
                    successMsg: '',
                    error: ''
                }
            case types.GET_ALL_LOAN_REQ_FAILURE:
            case types.GET_LOAN_REQ_BY_ID_FAILURE:
            case types.CREATE_LOAN_REQ_FAILURE:
            case types.UPDATE_LOAN_REQ_BY_ID_FAILURE:
                return {
                    ...state,
                    singleLoanRequest: null,
                    allLoanRequest: {},
                    successMsg: '',
                    error: payload
                }

        default:
            return state ;
    }
}