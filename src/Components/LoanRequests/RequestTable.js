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
import RequestAction from './Actions';

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

function createData(customerName, repaymentChoice, dateRequested, status) {
  return { customerName, repaymentChoice, dateRequested, status };
}

const rows = [
    createData('John Doe', "Weekly", dayjs().format("DD/MM/YYYY") , "pending"),
    createData('Ice  Sandwich', "Monthly", dayjs().format("DD/MM/YYYY"), "approved"),
    createData('Eclair', "Daily", dayjs().format("DD/MM/YYYY"), "declined"),
    createData('Cupcake', "Monthly", dayjs().format("DD/MM/YYYY"), "approved"),
    createData('Gingerbread', "Weekly", dayjs().format("DD/MM/YYYY"), "pending"),
    createData('John Doe', "Weekly", dayjs().format("DD/MM/YYYY") , "pending"),
    createData('Ice  Sandwich', "Monthly", dayjs().format("DD/MM/YYYY"), "approved"),
    createData('Eclair', "Daily", dayjs().format("DD/MM/YYYY"), "declined"),
    createData('Cupcake', "Monthly", dayjs().format("DD/MM/YYYY"), "approved"),
    createData('Gingerbread', "Weekly", dayjs().format("DD/MM/YYYY"), "pending"),
];

const RequestTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Loan Request Table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell align="right">Repayment Choice</TableCell>
            <TableCell align="right">Date Requested</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.customerName}>
                <TableCell component="th" scope="row">
                {row.customerName}
                 </TableCell>
                <TableCell align="right">{row.repaymentChoice}</TableCell>
                <TableCell align="right">{row.dateRequested}</TableCell>
                <TableCell align="right">
                    <Chip label={row.status} className={classes[row.status]} />
                </TableCell>
                <TableCell align="right">
                         <RequestAction/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RequestTable