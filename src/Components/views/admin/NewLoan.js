import React from 'react';
import { connect } from 'react-redux';
import AppNav from '../../Drawer/Drawer'
import LoanForm from '../../Loans/LoanForm';
import { createLoan } from '../../../actions/loans'

const NewLoan = ({ loading, createLoan, error,successMsg }) => {
    return (
        <AppNav>
        <LoanForm
            header='Create New Loan'
            action={createLoan}
            loading={loading}
            error={error}
            successMsg={successMsg}
            buttonTitle='create'/>
        </AppNav>
    )
}
const mapStateToProps = state => ({
    loading: state.loans.loading,
    successMsg: state.loans.successMsg,
    error: state.loans.error
})
export default connect(mapStateToProps, {createLoan}) (NewLoan)
