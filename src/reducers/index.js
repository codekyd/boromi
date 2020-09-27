/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import { combineReducers} from 'redux';

/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import auth from './auth';
import loans from './loan'
import loanRequests from './loanRequest'


export default combineReducers({
	auth,
	loans,
	loanRequests
})