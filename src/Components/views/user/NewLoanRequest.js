import React from "react";
import { connect } from 'react-redux';
import AppNav from "../../Drawer/Drawer";
import LoanRequestForm from "../../LoanRequests/RequestForm";


const NewLoanRequest = () => {
	return(
		<AppNav>
			<LoanRequestForm/>

		</AppNav>
	)
}

export default  connect(null, null)(NewLoanRequest)