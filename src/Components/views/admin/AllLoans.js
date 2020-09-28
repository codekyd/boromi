import React, {useEffect} from "react";
import AppNav from "../../Drawer/Drawer";
import { connect} from "react-redux";
import PropTypes from "prop-types";
import { getAllLoans } from "../../../actions/loans"
import LoansLayout from "../../Loans/LoansLayout"
import LoanItem from "../../Loans/LoanItem";
import Loader from "../../Loader/Loader"


const  AllLoans = ( {allLoans, getAllLoans, loading}) => {

	useEffect(() => {
		getAllLoans()

	}, [getAllLoans])
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
const mapStateToProps = state => ({
	loading: state.loans.loading,
	allLoans: state.loans.allLoans
});
AllLoans.propTypes = {
	loading: PropTypes.bool.isRequired,
	allLoans: PropTypes.array.isRequired,
	getAllLoans: PropTypes.func.isRequired
}
export default  connect(mapStateToProps, {getAllLoans})(AllLoans);