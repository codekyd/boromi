import * as types from "../actions/types";

const initialState = {
    loading: false,
    singleLoan: null,
    allLoans: {},
    successMsg: "",
    error: null
}
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.CREATE_NEW_LOAN_REQUEST:
        case types.GET_LOAN_BY_ID_REQUEST:
        case types.GET_ALL_LOANS_REQUEST:
        case types.UPDATE_LOAN_BY_ID_REQUEST:
        case types.DELETE_LOAN_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.CREATE_NEW_LOAN_SUCCESS:
            return {
                ...state,
                loading: false,
                singleLoan: null,
                successMsg: payload,
                error: null
            }
            case types.GET_LOAN_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    singleLoan: payload,
                    allLoans: null,
                    error: null,
                }
                case types.GET_ALL_LOANS_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        singleLoan: null,
                        allLoans: payload,
                        error: null
                    }
                    case types.UPDATE_LOAN_BY_ID_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            singleLoan: payload
                        }

                    case types.DELETE_LOAN_BY_ID_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            allLoans: state.allLoans.filter((loan) => loan.id !== payload),
                            error: null
                        }
                    case types.CREATE_NEW_LOAN_FAILURE:
                    case types.GET_LOAN_BY_ID_FAILURE:
                    case types.GET_ALL_LOANS_FAILURE:
                    case types.UPDATE_LOAN_BY_ID_FAILURE:
                    case types.DELETE_LOAN_BY_ID_FAILURE:
                        return {
                            ...state,
                            loading: false,
                            successMsg: "",
                            error: payload
                        }
        default:
            return state;
    }
}