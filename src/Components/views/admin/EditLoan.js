import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AppNav from '../../Drawer/Drawer'
import LoanForm from '../../Loans/LoanForm';
import { getLoanByID, updateLoanByID } from '../../../actions/loans';
import PropTypes from "prop-types"

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
});
//Props for Edit Loan
EditLoan.propTypes = {
    loading: PropTypes.bool.isRequired,
    singleLoan: PropTypes.object.isRequired,
    successMsg: PropTypes.string,
    error: PropTypes.string,
    getLoanByID: PropTypes.func.isRequired,
    updateLoanByID: PropTypes.func.isRequired

}
export default connect(mapStateToProps, { getLoanByID, updateLoanByID }) (EditLoan)
