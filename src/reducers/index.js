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
import events from "./events"
import reserve from "./reservations"

export default combineReducers({
	auth,
	events,
	reserve
})