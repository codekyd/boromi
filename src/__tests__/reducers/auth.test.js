import reducer from "../../reducers/auth"
import * as types from "../../actions/types"
import mockLocalStorage from "../../__mocks__/localStorage";
window.localStorage = mockLocalStorage;
import userData from "../../__mocks__/data";
describe("Performs Auth Reducers", () => {
    let state = {
        token:localStorage.getItem("token") || null,
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false

    }
    const { authResponse } = userData;
    const errMsg = "Some Auth Occurred Here";
    const successState = {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: authResponse.data.token,
        user: authResponse.data
    }
    const failureState = {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        error: errMsg
    }
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(state)
    })
    //LOAD USER REDUCER
    it("Should handle USER_LOADED_REQUEST", () => {
        const startAction = { type: types.USER_LOADED_REQUEST }
        expect(reducer({},startAction)).toEqual({loading: true})
    })
    it("Should handle USER_LOADED_SUCCESS", () => {
        const successAction = {
            type: types.USER_LOADED_SUCCESS,
            payload: authResponse.data
        }
        expect(reducer({}, successAction)).toEqual(successState)
    })
    it("Should handle USER_LOADED_FAILURE", () => {
        const failedAction = {
            type: types.USER_LOADED_FAILURE,
            payload: errMsg
        }
        expect(reducer({}, failedAction)).toEqual(failureState)
    })
    //REGISTER REDUCERS
    it("Should handle LOGIN_REQUEST", () => {
        const startAction = { type: types.LOGIN_REQUEST }
        expect(reducer({},startAction)).toEqual({loading: true})
    })
    it("Should handle LOGIN_SUCCESS", () => {
        const successAction = {
            type: types.LOGIN_SUCCESS,
            payload: authResponse.data
        }
        expect(reducer({}, successAction)).toEqual(successState)
    })
    it("Should handle LOGIN_FAILURE", () => {
        const failedAction = {
            type: types.LOGIN_FAILURE,
            payload: errMsg
        }
        expect(reducer({}, failedAction)).toEqual(failureState)
    })
      //SIGNUP REDUCERS
      it("Should handle REGISTER_REQUEST", () => {
        const startAction = { type: types.REGISTER_REQUEST }
        expect(reducer({},startAction)).toEqual({loading: true})
    })
    it("Should handle REGISTER_SUCCESS", () => {
        const successAction = {
            type: types.REGISTER_SUCCESS,
            payload: authResponse.data
        }
        expect(reducer({}, successAction)).toEqual(successState)
    })
    it("Should handle REGISTER_FAILURE", () => {
        const failedAction = {
            type: types.REGISTER_FAILURE,
            payload: errMsg
        }
        expect(reducer({}, failedAction)).toEqual(failureState)
    })
})