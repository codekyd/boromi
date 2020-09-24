import * as types from "../actions/types";

const initialState = {
    loading: false,
    singleLoan: null,
    allLoans: [],
    successMsg: "",
    errors: null
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
                allLoans: {...state.allLoans, payload},
                singleLoan: null,
                errors: null
            }
            case types.GET_LOAN_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    singleLoan: payload,
                    allLoans: null,
                    errors: null,
                }
                case types.GET_ALL_LOANS_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        singleLoan: null,
                        allLoans: payload,
                        errors: null
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
                            errors: null
                        }
        default:
            return state;
    }
}