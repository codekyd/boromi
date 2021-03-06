import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoansLayout from '../../Loans/LoansLayout'
import AppNav from '../../Drawer/Drawer'
import LoanItem from '../../Loans/LoanItem'
import { getLoanRequestsByUserID } from '../../../actions/loanRequest'
import RequestLayout from "../../LoanRequests/RequestLayout";
import RequestTable from "../../LoanRequests/RequestTable";
import {ButtonLink} from "../../Buttons/Buttons";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography";

const Dashboard = ({ user,loanRequests,loading, getLoanRequestsByUserID }) => {

		useEffect(() => {
			if(user) {
				getLoanRequestsByUserID(user.id)
			}
		}, [getLoanRequestsByUserID, user]);
		let approvedLoanRequests = null;
		if(loanRequests) {
			 approvedLoanRequests = loanRequests.filter((loanRequest) => loanRequest.status === 'approved')
		}

return(
	<AppNav>
			{/* checks if there are loans and display them */}
			<Grid item md={8}>
				<Button variant="contained">
					<ButtonLink linkTo="/loan-requests/new" content="Apply for a new Loan"/>
				</Button>
			</Grid>

		{ approvedLoanRequests.length > 0 ?
			<LoansLayout title='My Approved Loans' justify="center">
				{approvedLoanRequests.map((request) =>
					<LoanItem key={request.loan.id}
					          {...request.loan}/>)}
			</LoansLayout> :
			<Typography variant="h5">
				No Loan Approved yet!
			</Typography>
			}
		{
			loanRequests.length === 0 ?
				<Typography variant="h5">
				No Loan Request Found!
				</Typography> :
				<RequestLayout>
					<RequestTable
						title="My Loan Requests"
						loading={loading}
						loanRequests={loanRequests}/>
				</RequestLayout>
		}

	</AppNav>
)

}


const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.loanRequests.loading,
	loanRequests:state.loanRequests.allLoanRequests
})
Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	loanRequests: PropTypes.array.isRequired,
	getLoanRequestsByUserID: PropTypes.func.isRequired
}

export default  connect(mapStateToProps, {getLoanRequestsByUserID})(Dashboard)