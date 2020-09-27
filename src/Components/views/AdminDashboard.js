import React, {useEffect, useState} from 'react';
import AppNav from '../Drawer/Drawer';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getAllLoans } from '../../actions/loans'
import { getAllLoanRequest } from '../../actions/loanRequest'
import LoansLayout from '../Loans/LoansLayout'
import LoanItem from '../Loans/LoanItem';
import Loader from '../Loader/Loader'
import RequestTable from '../LoanRequests/RequestTable';
import RequestLayout from '../LoanRequests/RequestLayout';


const  AdminDashboard = ( {allLoans, getAllLoans, getAllLoanRequest, loanIsLoading, loanRequestIsLoading, allLoanRequests, successMsg}) => {
	useEffect(() => {
		getAllLoans();
		getAllLoanRequest()

	}, [getAllLoans, getAllLoanRequest, successMsg])
	return(
		<AppNav>
			{/* checks if there are loans and display them */}
			<LoansLayout title='All Loans'>
				{ loanIsLoading && <Loader/> }
				{ allLoans && !loanIsLoading && allLoans.map((loan) =><LoanItem key={loan.id} {...loan}/>)}
			</LoansLayout>
				{ allLoans && allLoanRequests && !loanRequestIsLoading &&
					<RequestLayout>
						<RequestTable
						title="All Loan Requests"
						loading={loanRequestIsLoading}
						loanRequests={allLoanRequests}/>
					</RequestLayout>}
		</AppNav>
	)
}
const mapStateToProps = state => ({
	loanIsLoading: state.loans.loading,
	allLoans: state.loans.allLoans,
	loanRequestIsLoading: state.loanRequests.loading,
	allLoanRequests: state.loanRequests.allLoanRequests,
	successMsg: state.loanRequests.successMsg,
});
AdminDashboard.propTypes = {
	loanIsLoading: PropTypes.bool.isRequired,
	allLoans: PropTypes.array.isRequired,
	getAllLoans: PropTypes.func.isRequired,
	loanRequestIsLoading: PropTypes.bool.isRequired,
	allLoanRequests: PropTypes.array.isRequired,
	getAllLoanRequest: PropTypes.func.isRequired,
	successMsg: PropTypes.string.isRequired
}
export default  connect(mapStateToProps, {getAllLoans, getAllLoanRequest})(AdminDashboard);