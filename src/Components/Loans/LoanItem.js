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
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

 const LoanItem =({ title, amount, interest,maxPayBack, id }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime)

  return (
    <Grid item md={4}>
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
                    Repayment   {dayjs().to(maxPayBack)}
                  </Typography>
            </CardContent>
            <CardActions>
              <ButtonLink linkTo={`/loans/${id}`} content="View Loan"/>
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