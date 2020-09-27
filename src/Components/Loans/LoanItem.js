import React from 'react';
import { Grid,Card, CardActions, CardContent, Button, Typography, makeStyles } from "@material-ui/core"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types";
import { formatMoney } from '../../utils/helpers';
import { ButtonLink } from '../Buttons/Buttons';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 30
  },
  cardActions: {
    justifyContent: "space-between"
}
});

 const LoanItem =({ title, amount, interest,maxPayBack, id }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime)
 let chosenDay = dayjs().month((maxPayBack) -1).format("M");
 let expectedDay = dayjs().add(chosenDay, "M");
 console.log(expectedDay);
  return (
    <Grid item md={5}>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatMoney(amount)}
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
            <CardActions className={classes.cardActions}>
              <ButtonLink linkTo={`/loans/${id}`} content="View Loan"/>
              <ButtonLink linkTo={`/loans/${id}/requests`} content="View Loan Requests"/>
            </CardActions>
        </Card>
    </Grid>
  );
}
LoanItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  interest: PropTypes.number.isRequired,
  maxPayBack: PropTypes.string.isRequired
}
export default LoanItem