import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import dayjs from "dayjs"
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { formatMoney } from '../../utils/helpers';
import Alerts from "../Alerts/Alerts";
import {updateLoanRequestByID} from "../../actions/loanRequest";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  pending: {
      backgroundColor: ""
  },
  approved: {
    color: "rgb(30, 70, 32)",
    backgroundColor: "rgb(237, 247, 237)"

  },
  declined: {
      color: "#f50057",
      backgroundColor: "rgb(238, 190, 207)"
  }
});



const RequestTable = ({ title, loanRequests,updateLoanRequestByID, successMsg, error, isAdmin }) => {
  const handleRequestAction = (id,status) => {
		updateLoanRequestByID(id,{status})
    console.log(id)
	}
  const classes = useStyles();
  return (
    <>
           <Grid item md={12}>
             <Typography variant="h6">
                {title}
              </Typography>
              <TableContainer component={Paper}>
                { successMsg && <Alerts successMsg={successMsg}/> }
                { error &&   <Alerts error={error}/> }
                <Table className={classes.table} aria-label="Loan Request Table">

                  <TableHead>
                    <TableRow>
                      {isAdmin && <TableCell>Customer Name</TableCell>}
                      <TableCell align="right">Repayment Choice</TableCell>
                      <TableCell align="right">Date Requested</TableCell>
                      <TableCell align="right">Loan</TableCell>
                      <TableCell align="right">Loan Amount</TableCell>
                      <TableCell align="right">Status</TableCell>
                     { isAdmin && <TableCell align="right">Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* only show a table row is there is a loan request and a loan */}
                    { loanRequests.length > 0 && loanRequests.map((loanRequest) => (
                      loanRequest.loan && <TableRow key={loanRequest.id}>
                        {
                          isAdmin &&   <TableCell component="th" scope="loanRequest">
                            {loanRequest.user.name}
                          </TableCell>
                        }
                          <TableCell align="right">{loanRequest.repaymentChoice}</TableCell>
                          <TableCell align="right">{dayjs(loanRequest.dateRequested).format('DD/MM/YYYY')}</TableCell>
                          <TableCell align="right">{loanRequest.loan.title}</TableCell>
                          <TableCell align="right">{formatMoney(loanRequest.loan.amount)}</TableCell>
                          <TableCell align="right">
                              <Chip label={loanRequest.status} className={classes[loanRequest.status]} />
                          </TableCell>
                          {/* only render Action button if the user is an admin */}
                         {isAdmin &&
                         <TableCell align="right">
                           <Tooltip title="Approve Loan Request">
                             <IconButton aria-label="Approve Loan Request">
                               <DoneIcon
                                   onClick={() =>handleRequestAction(loanRequest.id,"approved")}
                               />
                             </IconButton>
                           </Tooltip>
                           <Tooltip title="Decline Loan Request">
                             <IconButton aria-label="Decline Loan Request">
                               <DeleteIcon
                                   onClick={() =>handleRequestAction(loanRequest.id,"declined")}
                               />
                             </IconButton>
                           </Tooltip>

                          </TableCell>}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
      </Grid>
    </>
  );
}
RequestTable.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loanRequests: PropTypes.array.isRequired,
  successMsg: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  isAdmin : state.auth.user? state.auth.user.isAdmin : false,
  successMsg: state.loanRequests.successMsg,
  error: state.loanRequests.error
})
export default connect(mapStateToProps, {updateLoanRequestByID})(RequestTable)
