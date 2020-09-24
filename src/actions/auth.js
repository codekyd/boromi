import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	REGISTER_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS, USER_LOADED_FAILURE, USER_LOADED_REQUEST, USER_LOADED_SUCCESS
} from "./types";
import axios from "axios";


const token = localStorage.getItem("token")

// dispatch load User action
export  const loadUser = (token) =>   async dispatch => {
	dispatch({ type: USER_LOADED_REQUEST })
	if(token) {
	try {
			const res = await axios.post("/api/auth",
				token
			);
			dispatch({
				type: USER_LOADED_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: USER_LOADED_FAILURE,
				payload: err.response.data
			});
		}
} else dispatch({
	type: USER_LOADED_FAILURE,
	payload: "Not authenticated"
})
}

// dispatch login Action
export const loginUser = ({ email, password}) => async dispatch => {
	dispatch({ type: LOGIN_REQUEST })
	try {
		const res = await axios.post("/api/login", {
			email,
			password
		});
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: LOGIN_FAILURE,
			payload: err.response.data
		});
	}
}


// dispatch register action
export const registerUser = ({username, name, email, password, isAdmin}) => async dispatch => {
	dispatch({ type: REGISTER_REQUEST});
	try {
		const res = await axios.post("/api/signup", {
			username,
			name,
			email,
			password,
			isAdmin
		});
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: REGISTER_FAILURE,
			payload: err.response.data
		});
	}
}