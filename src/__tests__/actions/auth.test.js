import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import makeServer from "../../server"
import * as actions from "../../actions/auth"
import * as types from "../../actions/types"
import userData from "../../__mocks__/data";
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const  mockRequest = new MockAdapter(axios);

describe("Dispatches All Auth actions", () => {
    makeServer({environment: "test"})
    const { authResponse, signupData, loginData } = userData;
    // beforeEach(() => { mockRequest.reset(); })
    afterEach(() => { mockRequest.reset();})

    //   Test For Loading of a User
    it("Dispatches a USER_LOADED_SUCCESS action when fetching User has been done",  async () => {
        const store = mockStore({ });
        const token = "JohnDoeToken";
        mockRequest.onPost("/api/auth",token).replyOnce(200, authResponse.data)
        const expectedAction = [
            {type: types.USER_LOADED_REQUEST},
            {type: types.USER_LOADED_SUCCESS, payload: authResponse.data}
        ]
        await store.dispatch(actions.loadUser(token))
        .then(() => {
        // return of async actions
        return expect(store.getActions()).toEqual(expectedAction)
        })
    })
    it("Dispatches a USER_LOADED_FAILURE action when fetching User failed", async () => {
        const store = mockStore({ });
        const token = "InvalidToken";
        mockRequest.onPost("/api/auth",token).replyOnce(401,  {error: "User Not Authenticated"})
        const expectedAction = [
            {type: types.USER_LOADED_REQUEST},
            {type: types.USER_LOADED_FAILURE, payload: {error: "User Not Authenticated"}}
        ]
        await store.dispatch(actions.loadUser(token))
        .then(() => {
        // return of async actions
        return expect(store.getActions()).toEqual(expectedAction)
        })

    })
    it("Dispatch a LOGIN_SUCCESS action when a user logins  successfully",  async () => {
        const store = mockStore({ });
        mockRequest.onPost("/api/login", loginData).replyOnce(200, authResponse.data.token)
        const expectedAction = [
            {type: types.LOGIN_REQUEST},
            { type: types.LOGIN_SUCCESS, payload: authResponse.data.token }
        ]
        await store.dispatch(actions.loginUser(loginData))
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction)

        })
    })
    it("Dispatch a LOGIN_FAILURE action when a user logins  fails",  async () => {
        const store = mockStore({ });
        mockRequest.onPost("/api/login", loginData).replyOnce(404, {error: "User Not Found"})
        const expectedAction = [
            {type: types.LOGIN_REQUEST},
            { type: types.LOGIN_FAILURE, payload: {error: "User Not Found"} }
        ]
        await store.dispatch(actions.loginUser(loginData))
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction)

        })
    })

    it("Dispatches a REGISTER_SUCCESS when a user signup successfully", async () => {
        const store = mockStore({  })
        mockRequest.onPost("/api/signup", signupData).replyOnce(201, authResponse)
        const expectedAction = [
            { type: types.REGISTER_REQUEST },
            { type: types.REGISTER_SUCCESS, payload: authResponse }
        ]
        await store.dispatch(actions.registerUser(signupData))
        .then(() =>{
            expect(store.getActions()).toEqual(expectedAction)
        })
    })
    it("Dispatches a REGISTER_FAILURE when a user signup fails", async () => {
        const store = mockStore({  })
        mockRequest.onPost("/api/signup", signupData).replyOnce(500, {error: "User already exist"})
        const expectedAction = [
            { type: types.REGISTER_REQUEST },
            { type: types.REGISTER_FAILURE, payload: {error: "User already exist"} }
        ]
        await store.dispatch(actions.registerUser(signupData))
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        })
    })

})