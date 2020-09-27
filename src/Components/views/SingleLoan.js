import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Button, Card, CardActions, CardContent, Grid, Icon, makeStyles, Typography } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import AppNav from '../Drawer/Drawer'
import { getLoanByID, deleteLoanByID } from "../../actions/loans"
import LoansLayout from '../Loans/LoansLayout'
import Loader from '../Loader/Loader'
import { formatMoney } from '../../utils/helpers'
import { ButtonLink } from '../Buttons/Buttons';
import { Link } from 'react-router-dom';
import RequestTable from '../LoanRequests/RequestTable';

const useStyles = makeStyles({
    root: {
        padding: "20px 10px",
    },
    cardActions: {
        justifyContent: "space-between"
    }
})

const SingleLoan = ({history,match, loading, singleLoan, getLoanByID, deleteLoanByID}) => {
    const classes = useStyles()
    const singleLoanID = match.params.id
    // fetch loan on component mount
    useEffect(() => {
        getLoanByID(singleLoanID)
    }, [getLoanByID,singleLoanID])
    dayjs.extend(relativeTime);
    const handleDeleteRequest = () => {
        deleteLoanByID(singleLoanID);
        history.push("/loans")
    }
    //  calculate the expected duration of the loan
    let chosenDay
    let expectedDay
    if(singleLoan) {
        chosenDay = dayjs().month((singleLoan.loan.maxPayBack) -1).format("M");
        expectedDay = dayjs().add(chosenDay, "M");
    }

    return (
        <AppNav>
            {
                loading ? <Loader/> :
                singleLoan && !loading &&
                <LoansLayout title={singleLoan.loan.title}>
                    <Grid item md={6}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                <Link to="/loans">
                           <Icon color="primary" fontSize="large">
                           <ArrowBackIcon/>
						</Icon>
                           </Link>
                                </Typography>
                            <Typography variant="h5" gutterBottom>
                                {singleLoan.loan.title}
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                value
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {formatMoney(singleLoan.loan.amount)}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            Repayment   {
                            expectedDay.fromNow()
                            }
                            </Typography>
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <ButtonLink linkTo={`/loans/update/${singleLoan.loan.id}`} content="Update Loan"/>
                                <Button color="secondary" onClick={handleDeleteRequest}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={12}>
                        <Typography variant="h6">
                        {singleLoan.loan.title} Loan requests
                        </Typography>
                        <RequestTable/>
                    </Grid>
                </LoansLayout>
            }
        </AppNav>
    )
}
const mapStateToProps = state => ({
    singleLoan: state.loans.singleLoan
});
export default connect(mapStateToProps, {getLoanByID, deleteLoanByID})(SingleLoan)
