import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Card, CardActions, CardContent, Grid, Icon, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import AppNav from '../../Drawer/Drawer'
import { getLoanByID, deleteLoanByID } from '../../../actions/loans'
import LoansLayout from '../../Loans/LoansLayout'
import Loader from '../../Loader/Loader'
import { formatMoney } from '../../../utils/helpers'
import { ButtonLink } from '../../Buttons/Buttons';
import { Link } from 'react-router-dom';

import { getLoanRequestsByLoanID } from '../../../actions/loanRequest'
import RequestTable from '../../LoanRequests/RequestTable';
import RequestLayout from '../../LoanRequests/RequestLayout';

const useStyles = makeStyles({
    root: {
        padding: '20px 10px',
    },
    cardActions: {
        justifyContent: 'space-between'
    }
})

const SingleLoan = ({
    history,
    match,
    loanIsLoading,
    singleLoan,
    getLoanByID,
    loanRequestIsLoading,
    loanRequests,
    getLoanRequestsByLoanID,
    successMsg,
    deleteLoanByID}) => {
    const classes = useStyles()
    const singleLoanID = match.params.id
    // fetch loan  and loanRequest on component mount
    useEffect(() => {
        getLoanByID(singleLoanID)
        getLoanRequestsByLoanID(singleLoanID)
    }, [getLoanByID,getLoanRequestsByLoanID,singleLoanID, successMsg])
    dayjs.extend(relativeTime);
    const handleDeleteRequest = () => {
        deleteLoanByID(singleLoanID);
        history.push('/admin')
    }
    //  calculate the expected duration of the loan
    let chosenDay
    let expectedDay
    if(singleLoan) {
        chosenDay = dayjs().month((singleLoan.maxPayBack) -1).format('M');
        expectedDay = dayjs().add(chosenDay, 'M');
    }

    return (
        <AppNav>
            <>
               { loanIsLoading && <Loader/> }
                {singleLoan && !loanIsLoading &&
                <LoansLayout title={singleLoan.title}>
                    <Grid item md={6}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant='h6' gutterBottom>
                                    <Link to='/admin/loans'>
                                    <Icon color='primary' fontSize='large'>
                                        <ArrowBackIcon/>
                                    </Icon>
                                    </Link>
                                </Typography>
                                <Typography variant='h5' gutterBottom>
                                {singleLoan.title}
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                { singleLoan.description }
                                </Typography>
                                <Typography variant='h5' gutterBottom>
                                {formatMoney(singleLoan.amount)}
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    Repayment   {
                                    expectedDay.fromNow()
                                    }
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <ButtonLink linkTo={`/admin/loans/update/${singleLoan.id}`} content='Update Loan'/>
                                <Button color='secondary' onClick={handleDeleteRequest}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </LoansLayout>
                }
            {       singleLoan && loanRequests &&
                      <RequestLayout>
                          <RequestTable
                              loading={loanRequestIsLoading}
                              title={`${singleLoan.title} Loan Requests`}
                              loanRequests={loanRequests}/>
                      </RequestLayout>}

                      </>
        </AppNav>
    )
}
const mapStateToProps = state => ({
    singleLoan: state.loans.singleLoan,
    loanIsLoading: state.loans.loading,
    loanRequestIsLoading: state.loanRequests.loading,
    loanRequests: state.loanRequests.allLoanRequests,
    successMsg: state.loanRequests.successMsg

});
SingleLoan.propTypes = {
    singleLoan: PropTypes.object,
    loanIsLoading: PropTypes.bool.isRequired,
    loanRequestIsLoading: PropTypes.bool.isRequired,
    loanRequests: PropTypes.array.isRequired,
    successMsg: PropTypes.string.isRequired

}
export default connect(mapStateToProps, {getLoanByID, deleteLoanByID, getLoanRequestsByLoanID})(SingleLoan)
