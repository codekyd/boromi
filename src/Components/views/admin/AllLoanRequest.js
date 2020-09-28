import React, {useEffect} from "react";
import { connect} from "react-redux";
import AppNav from "../../Drawer/Drawer";
import Loader from "../../Loader/Loader";
import PropTypes from 'prop-types'
import {getAllLoanRequest} from "../../../actions/loanRequest";
import RequestLayout from "../../LoanRequests/RequestLayout";
import RequestTable from "../../LoanRequests/RequestTable";

const AllLoansRequest = ({ user, loading, loanRequests, getAllLoanRequest}) => {
	useEffect(() => {
		if(user) {
			getAllLoanRequest()

		}

	},[getAllLoanRequest, user])

	return(

		<AppNav>
			{/* checks if there are loans and display them */}
			{	loading ? <Loader/> :
				<RequestLayout>
					{ loanRequests && !loading &&

						<RequestTable
							title="All Loan Requests"
							loading={loading}
							loanRequests={loanRequests}/>
					}
				</RequestLayout>
			}
		</AppNav>


	)

}
const mapStateToProps = state =>({
	user: state.auth.user,
	loading: state.loanRequests.loading,
	loanRequests:state.loanRequests.allLoanRequests,

})
AllLoansRequest.propTypes = {
	loading: PropTypes.bool.isRequired,
	getAllLoanRequest: PropTypes.func.isRequired

}
export default  connect(mapStateToProps, {getAllLoanRequest})(AllLoansRequest)