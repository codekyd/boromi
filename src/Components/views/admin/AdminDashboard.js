import React, {useEffect} from 'react';
import AppNav from '../../Drawer/Drawer';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getAllLoans } from '../../../actions/loans'
import {getAllLoanRequest} from '../../../actions/loanRequest'
import LoansLayout from '../../Loans/LoansLayout'
import LoanItem from '../../Loans/LoanItem';
import Loader from '../../Loader/Loader'
import RequestTable from '../../LoanRequests/RequestTable';
import RequestLayout from '../../LoanRequests/RequestLayout';
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ButtonLink} from "../../Buttons/Buttons";


const  AdminDashboard = ( {
	                          allLoans,
	                          getAllLoans,
	                          getAllLoanRequest,
	                          loanIsLoading,
	                          loanRequestIsLoading,
	                          allLoanRequests}) => {
	useEffect(() => {
		getAllLoans();
		getAllLoanRequest()

	}, [getAllLoans, getAllLoanRequest])


	return(
		<AppNav>
			{/* checks if there are loans and display them */}
			<LoansLayout title='All Loans'>
				<Grid item md={8}>
					<Button variant="contained">
						<ButtonLink linkTo="/admin/loans/new" content="Create a new Loan"/>
					</Button>
				</Grid>
				{ loanIsLoading && <Loader/> }
				{ allLoans && !loanIsLoading && allLoans.map((loan) =><LoanItem key={loan.id} {...loan}/>)}
			</LoansLayout>
				{  allLoanRequests && !loanRequestIsLoading &&
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
	allLoans: PropTypes.array,
	getAllLoans: PropTypes.func.isRequired,
	loanRequestIsLoading: PropTypes.bool.isRequired,
	allLoanRequests: PropTypes.array.isRequired,
	getAllLoanRequest: PropTypes.func.isRequired,
	successMsg: PropTypes.string.isRequired
}
export default  connect(mapStateToProps, {getAllLoans, getAllLoanRequest})(AdminDashboard);