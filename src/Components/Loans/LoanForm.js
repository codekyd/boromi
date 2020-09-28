import React, { useState } from 'react'
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { PrimaryButton } from '../Buttons/Buttons'
import TextInput from '../Inputs/TextInput'
import Loader from '../Loader/Loader'
import LoansLayout from './LoansLayout'
import Alerts from '../Alerts/Alerts';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    root:{
        backgroundColor: "#fff",
        margin: "10px",
        padding:"30px"
    }
})
const LoanForm = ({header,fetchedLoan, loading, action, error, successMsg, buttonTitle}) => {
    const classes = useStyle()

    const initialState = {
        title: fetchedLoan ? fetchedLoan.title : "",
        amount: fetchedLoan ? parseFloat(fetchedLoan.amount ).toLocaleString("en-NG",{style: 'decimal'})  : 0,
        interest: fetchedLoan ? fetchedLoan.interest : 1,
        maxPayBack: 3,
    }
    const [loanData, setLoanData] = useState(initialState);
    const [loanErr, setLoanErr] = useState({});
    const { title, amount, interest, maxPayBack } = loanData;
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if(name === "amount"){
             // strip alphabet letters
             value = value.replace(/[A-Za-z]/g, '');
            //  strip leading zeros
             value = value.replace(/^(-)?0+(?=\d)/, '$1');
             value = value.replace(/,/g, '');
            //  add commas to value
             let numValue = parseFloat(value).toLocaleString("en-NG",{style: 'decimal'})
        setLoanData({...loanData, [name]: value ? numValue : 0 })
    }
     else {
        setLoanData({...loanData, [name]: value})
    }

    }

       // validates the inputs before sending an action
       const validateData = () => {
        let errors = { }
        errors.titleErr = title ? "" : "Title is required"
        errors.amountErr = amount ? "" : "Amount is required"
        errors.interestErr = interest ? "" : "Interest is required"
        errors.maxPayBackErr = maxPayBack ? "" : "Pay back duration is required"
        setLoanErr({
            ...errors
        })
        return Object.values(errors).every(x => x === "")
    }
    const onSubmit = (e) => {
        // sends a new or update loan request
        e.preventDefault()
        if(validateData()){
           buttonTitle === "update" ?   action(loanData, fetchedLoan.id) : action(loanData)
        }
    }

    return (
        <LoansLayout>

               <Grid item md={5}>
                   <Card className={classes.root}>
                   {loading && <Loader/>}
                       <Typography variant="h6" align="center" gutterBottom>
                           {header}
                       </Typography>
                       <Typography variant="body2" gutterBottom>
                           <Link to="/admin">
                           <Icon color="primary" fontSize="large">
                           <ArrowBackIcon/>
						</Icon>
                           </Link>

                       </Typography>

                       { successMsg && <Alerts successMsg={successMsg}/> }
                     { error &&   <Alerts error={error}/> }
                        <form noValidate autoComplete="off" onSubmit={onSubmit}>
                            <TextInput
                                label="Loan Title"
                                name="title"
                                type="text"
                                value={title}
                                error={loanErr.titleErr}
                                handleInputChange={handleInputChange}/>
                            <TextInput
                                label="Loan Amount"
                                name="amount"
                                placeholder="00.00"
                                type="text"
                                value={amount}
                                error={loanErr.amountErr}
                                handleInputChange={handleInputChange}/>
                            <TextInput
                                label="Interest Rate ( in Percentage)"
                                name="interest"
                                type="number"
                                value={interest}
                                error={loanErr.interestErr}
                                handleInputChange={handleInputChange}/>
                            <TextInput
                                label="Maximum Pay Back Duration(in Months)"
                                name="maxPayBack"
                                type="number"
                                value={maxPayBack}
                                error={loanErr.maxPayBackErr}
                                handleInputChange={handleInputChange}/>
                                <PrimaryButton
                                    type="submit"
                                    title={`${buttonTitle} Loan`}
                                    />
                        </form>
                    </Card>
               </Grid>

        </LoansLayout>
    )
}

export default LoanForm
