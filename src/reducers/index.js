/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import { combineReducers} from "redux";

/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import auth from "./auth";
import loans from "./loan"

export default combineReducers({
	auth,
	loans
})