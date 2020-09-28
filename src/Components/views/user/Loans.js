import React from "react";
import { connect} from "react-redux";
import AppNav from "../../Drawer/Drawer";
import Loader from "../../Loader/Loader";
import LoansLayout from "../../Loans/LoansLayout";
import LoanItem from "../../Loans/LoanItem";
import PropTypes from 'prop-types'
import { getLoanRequestsByUserID} from "../../../actions/loanRequest";

const Loans = ({ loading, loanRequests}) => {
	return(

		<AppNav>
			{/* checks if there are loans and display them */}
			{	loading ? <Loader/> :
				<LoansLayout title="All Loans">
					{ allLoans && !loading && allLoans.map((loan) =><LoanItem key={loan.id} {...loan}/>)}
				</LoansLayout>
			}
		</AppNav>


	)

}
const mapStateToProps = state =>({
	user: state.auth.user,
	loading: state.loanRequests.loading,
	loanRequests:state.loanRequests.allLoanRequests
})
Loans.propTypes = {
	loading: PropTypes.bool.isRequired,

}
export default  connect(mapStateToProps, {getLoanRequestsByUserID})(Loans)