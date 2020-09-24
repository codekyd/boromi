/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import { createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";

/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import rootReducers from "../reducers";


const initialState = {};
const middleware = [thunk];

const store =  createStore(
	rootReducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export  default  store;