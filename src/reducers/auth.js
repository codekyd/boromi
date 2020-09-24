import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS, REGISTER_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	USER_LOADED_REQUEST,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAILURE
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token") || null,
	user: null,
	loading: false,
	errors: null,
	isAuthenticated: false
}

export  default   (state = initialState, action) => {
	const { type, payload} = action
	switch (type) {
		case USER_LOADED_REQUEST:
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true
			}
		case USER_LOADED_SUCCESS:
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
				localStorage.setItem("token",payload.token)
			return {
				...state,
				loading: false,
				token: payload.token,
				user: payload,
				isAuthenticated: true,
				errors: null

			}
		case USER_LOADED_FAILURE:
		case LOGIN_FAILURE:
		case REGISTER_FAILURE:
				localStorage.removeItem("token")
			return {
				...state,
				loading: false,
				user: null,
				token: null,
				isAuthenticated: false,
				errors: payload
		}

		default:
			return state
	}

}