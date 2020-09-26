import React, { useState } from 'react'
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import { PrimaryButton } from '../Buttons/Buttons'
import TextInput from '../Inputs/TextInput'
import Loader from '../Loader/Loader'
import LoansLayout from './LoansLayout'
import { formatMoney } from '../../utils/helpers';
import Alerts from '../Alerts/Alerts';

const useStyle = makeStyles({
    root:{
        backgroundColor: "#fff",
        margin: "10px",
        padding:"30px"
    }
})
const LoanForm = ({header,loan, loading, action, error, successMsg}) => {
    const classes = useStyle()
    const initialState = {
        title: "",
        amount: 0,
        interest: 1,
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
        setLoanData({...loanData, [name]: value.trim()})
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
            action(loanData)
        }
    }

    return (
        <LoansLayout>

               <Grid md={4}>
                   <Card className={classes.root}>
                   {loading && <Loader/>}
                       <Typography variant="h6" align="center" gutterBottom>
                           {header}
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
                                    title="Create Loan"
                                    />
                        </form>
                    </Card>
               </Grid>

        </LoansLayout>
    )
}

export default LoanForm
