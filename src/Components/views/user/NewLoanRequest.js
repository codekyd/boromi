import React from "react";
import { connect } from 'react-redux';
import AppNav from "../../Drawer/Drawer";
import LoanRequestForm from "../../LoanRequests/RequestForm";
import {createNewLoanRequest} from "../../../actions/loanRequest";


const NewLoanRequest = ({ createNewLoanRequest}) => {
	return(
		<AppNav>
			<LoanRequestForm createNewLoanRequest={createNewLoanRequest}/>

		</AppNav>
	)
}

export default  connect(null, {createNewLoanRequest})(NewLoanRequest)