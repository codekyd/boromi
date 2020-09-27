import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AppNav from '../Drawer/Drawer'
import LoanForm from '../Loans/LoanForm';
import { getLoanByID, updateLoanByID } from '../../actions/loans'

const EditLoan = ({match, loading, error, getLoanByID, updateLoanByID, singleLoan, successMsg }) => {
    const singleLoanID = match.params.id;
    // fetch loan on component mount
    useEffect(() => {
        getLoanByID(singleLoanID);
    }, [getLoanByID,singleLoanID])

    return (
        <AppNav>
            {
            singleLoan && <LoanForm
            header='Update a Loan'
            action={updateLoanByID}
            loading={loading}
            fetchedLoan={singleLoan}
            error={error}
            successMsg={successMsg}
            buttonTitle='update'/> }
        </AppNav>
    )
}
const mapStateToProps = state => ({
    loading: state.loans.loading,
    singleLoan: state.loans.singleLoan,
    successMsg: state.loans.successMsg,
    error: state.loans.error
})
export default connect(mapStateToProps, { getLoanByID, updateLoanByID }) (EditLoan)
