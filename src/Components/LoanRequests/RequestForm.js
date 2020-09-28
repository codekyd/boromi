import React, {useEffect, useState} from "react";
import RequestLayout from "./RequestLayout";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Loader from "../Loader/Loader";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {Icon} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect} from 'react-redux'
import Alerts from "../Alerts/Alerts";
import {PrimaryButton} from "../Buttons/Buttons";
import {makeStyles} from "@material-ui/core/styles";
import dayjs from "dayjs";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getAllLoans } from "../../actions/loans"
import PropTypes from "prop-types";
import {expectedDuration, formatMoney} from "../../utils/helpers";
import InputLabel from "@material-ui/core/InputLabel";


const useStyle = makeStyles({
	root:{
		backgroundColor: "#fff",
		margin: "10px",
		padding:"30px"
	},
	formInput: {
		width: '100%',
		marginTop: '20px',
		marginBottom: '20px'
	}
})

const LoanRequestForm = ({ loading, user, successMsg, error, allLoans, getAllLoans, createNewLoanRequest }) =>{
	const classes = useStyle()
	useEffect(() => {
		getAllLoans()

	}, [getAllLoans])
	const initialState = {
		status: 'pending',
		repaymentChoice: 'Daily',
		dateRequested: dayjs(),
		loan: '',
		loanInfo: null

	}
	const [requestData, setLoanData] = useState(initialState);

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		setLoanData({...requestData, [name]: value})
		// set loan info if a loan is selected
		if(name === 'loan'){
			const loanDetails = allLoans.filter((loan) => loan.title === value)
			setLoanData({...requestData, [name]: value,
				loanInfo:loanDetails[0]})

		}

	}
	const { status,dateRequested, repaymentChoice, loan, loanInfo } = requestData;
	const onSubmit = (e) => {
		// sends a new  loan request
		e.preventDefault()
		const newLoanRequest = {
			userId : user.id,
			status,
			loanId: loanInfo.id,
			dateRequested,
			repaymentChoice,
		}
		createNewLoanRequest(newLoanRequest)

	}
	return(
		<RequestLayout>
			<Grid item md={6}>
				<Card className={classes.root}>
					{loading && <Loader/>}
					<Typography variant="h6" align="center" gutterBottom>
						Loan Request Form
					</Typography>
					<Typography variant="body2" gutterBottom>
						<Link to="/dashboard">
							<Icon color="primary" fontSize="large">
								<ArrowBackIcon/>
							</Icon>
						</Link>

					</Typography>

					{ successMsg && <Alerts successMsg={successMsg}/> }
					{ error &&   <Alerts error={error}/> }
					<form noValidate autoComplete="off" onSubmit={onSubmit}>
						{allLoans &&
						<>
							{/*fetches loans and populate the input with it*/}
						<InputLabel id="loan">Select the type of loan you want</InputLabel>
						<Select
							name="loan"
							id="loan"
							value={loan}
							displayEmpty
							className={classes.formInput}
							variant="outlined"
							label="Select A Payment Plan"
							onChange={handleInputChange}>
							<MenuItem value="">Select  Loan Type</MenuItem>
							{allLoans.map(loan =>
								<MenuItem
									value={loan.title}>
									<span> {loan.title} </span>
									<span> {formatMoney(loan.amount)} </span>
								</MenuItem>)}
						</Select>
						</>
							}
						{ loanInfo && <Typography variant="body2" gutterBottom>
							Loan Duration: {dayjs(expectedDuration(loanInfo.maxPayBack)).fromNow()}</Typography> }
						<InputLabel id="repaymentChoice">Select how you want to pay the loan if approved</InputLabel>
						<Select
							name="repaymentChoice"
							value={repaymentChoice}
							displayEmpty
							className={classes.formInput}
							variant="outlined"
							label="Select A Payment Plan"
							onChange={handleInputChange}>
							<MenuItem value="Daily">Daily</MenuItem>
							<MenuItem value="Weekly">Weekly</MenuItem>
							<MenuItem value="Monthly">Monthly</MenuItem>
						</Select>

						<PrimaryButton
							type="submit"
							title="Request loan"
						/>
					</form>
				</Card>
			</Grid>
		</RequestLayout>

	)
}
const mapStateToProps = state => ({
	allLoansLoading: state.loans.loading,
	user: state.auth.user,
	allLoans: state.loans.allLoans,
	successMsg: state.loanRequests.successMsg,
	error: state.loanRequests.error
});
LoanRequestForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	allLoansLoading: PropTypes.bool.isRequired,
	allLoans: PropTypes.array.isRequired,
	getAllLoans: PropTypes.func.isRequired,
	createNewLoanRequest: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired
}
export default connect(mapStateToProps, {getAllLoans})(LoanRequestForm)