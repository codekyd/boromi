import React from "react";
import { connect } from "react-redux"
import AppNav from "../../Drawer/Drawer";
import RequestLayout from "../../LoanRequests/RequestLayout";
import {getAllLoanRequest} from "../../../actions/loanRequest";
import RequestTable from "../../LoanRequests/RequestTable";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {ButtonLink} from "../../Buttons/Buttons";
import Typography from "@material-ui/core/Typography";

const LoanRequests = ({ loading, allLoanRequests}) => {
	return(
		<AppNav>
			<Grid item md={8}>
				<Button variant="contained">
					<ButtonLink linkTo="/loan-requests/new" content="Apply for a new Loan"/>
				</Button>
			</Grid>
			{ !allLoanRequests && <Typography variant="h5">
				No Loan Requests yet!
			</Typography>}
			{ !loading && allLoanRequests &&
			<RequestLayout>
				<RequestTable
					title="All Loan Requests"
					loading={loading}
					loanRequests={allLoanRequests}/>
			</RequestLayout>
				}


		</AppNav>
	)

}
const mapStateToProps = state => ({
	loading:state.loanRequests.loading,
	allLoanRequests: state.loanRequests.allLoanRequests,

})
LoanRequests.propTypes = {
	loading: PropTypes.bool.isRequired,
	getAllLoanRequest: PropTypes.func.isRequired,
	allLoanRequests: PropTypes.array.isRequired
}

export default  connect(mapStateToProps, {getAllLoanRequest})(LoanRequests)