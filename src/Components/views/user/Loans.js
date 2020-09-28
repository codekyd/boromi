import React, {useEffect} from "react";
import { connect} from "react-redux";
import AppNav from "../../Drawer/Drawer";
import Loader from "../../Loader/Loader";
import LoansLayout from "../../Loans/LoansLayout";
import LoanItem from "../../Loans/LoanItem";
import PropTypes from 'prop-types'
import { getLoanRequestsByUserID} from "../../../actions/loanRequest";
import Typography from "@material-ui/core/Typography";

const Loans = ({ user, loading, loanRequests, getLoanRequestsByUserID}) => {
	useEffect(() => {
		if(user) {
			getLoanRequestsByUserID(user.id)

		}

	},[getLoanRequestsByUserID, user])
	return(

		<AppNav>
			{/* checks if there are loans and display them */}

			{	loading ? <Loader/> :
				<>
				{ !loanRequests && <Typography variant="h5">
				No Loan Found!
				</Typography>}
				<LoansLayout title="My Loans">
					{ loanRequests && !loading &&
					loanRequests.map((loanRequests) =>
						<LoanItem key={loanRequests.loan.id}
						          status={loanRequests.status}
						          {...loanRequests.loan} />)}
				</LoansLayout>
				</>
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