import React from 'react';
import { Grid,Card, CardActions, CardContent, Button, Typography, makeStyles } from "@material-ui/core"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types";
import { formatMoney } from '../../utils/helpers';
import { ButtonLink } from '../Buttons/Buttons';
import { connect } from 'react-redux'
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 30
  },
  cardActions: {
    justifyContent: "space-between"
},
    pending: {
        marginLeft: '30px'

    },
    approved: {
        color: "rgb(30, 70, 32)",
        backgroundColor: "rgb(237, 247, 237)",
        marginLeft: '30px'

    },
    declined: {
        color: "#f50057",
        backgroundColor: "rgb(238, 190, 207)",
        marginLeft: '30px'
    }

});

 const LoanItem =({ title, amount, interest,maxPayBack, status, id, isAdmin }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime)
 let chosenDay = dayjs().month((maxPayBack) -1).format("M");
 let expectedDay = dayjs().add(chosenDay, "M");
  return (
    <Grid item md={5}>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                  {title}

                </Typography>

                <Typography variant="body1" gutterBottom>
                  {formatMoney(amount)}
                    {status &&
                    <span>
                        <Chip label={status}
                              className={classes[status]}/>
                    </span>
                    }

                </Typography>
                <Typography variant="body1" gutterBottom>
                  {interest}% Interest
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Repayment   {

                    expectedDay.fromNow()
                    }
                  </Typography>
            </CardContent>
            { isAdmin &&
            <CardActions className={classes.cardActions}>
                  <ButtonLink linkTo={`/admin/loans/${id}`} content="View Loan"/>
                  <ButtonLink linkTo={`/admin/loans/${id}`} content="View Loan Requests"/>
            </CardActions>
            }
        </Card>
    </Grid>
  );
}
const mapStateToProps = state => ({
  isAdmin: state.auth.user? state.auth.user.isAdmin : false
})
LoanItem.propTypes = {
     title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    interest: PropTypes.number.isRequired,
    maxPayBack: PropTypes.number.isRequired,
    status: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired
}
export default connect(mapStateToProps, null)(LoanItem)