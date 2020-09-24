/*
*  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import React, {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Grid } from "@material-ui/core";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import {Redirect} from "react-router-dom";
/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import TextInput from "../Inputs/TextInput";
import AuthLayout from "./AuthLayout";
import {validateEmail, validatePassword} from "../../utils/helpers";
import {ButtonLink, PrimaryButton} from "../Buttons/Buttons";
import {registerUser} from "../../actions/auth";
import Loader from "../Loader/Loader";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',

        },
        stepper: {
            background: 'transparent'
        },
        choiceCard: {
            padding: '10px',
            margin: '5px',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.8)',
            boxShadow: 'none'

        },

        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
            margin: '5px',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.8)',
        },
    }),
);
const  SignUp = ({loading, isAuthenticated, registerUser, errors}) => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [formErr, setFormErr] = useState({})
        const { name, email, password } = signupData;

    // handle input change
    const handleInputChange = (e) => {
        const {name, value } = e.currentTarget
        setSignupData({...signupData, [name]  : value.trim()});
    }
    // validates the inputs before sending an action
    const validateData = () => {
        let errors = { }
        errors.nameErr = name ? "": "Name is required";
        errors.emailErr = validateEmail(email) ? "": "Email Address is Invalid"
        let invalidPassword = validatePassword(password,6)
        errors.passwordErr = !invalidPassword? "" : invalidPassword
        setFormErr({
            ...errors
        })
        return Object.values(errors).every(x => x === "")
    }
    const onSubmit = (e) => {

        e.preventDefault()
        // check if the form is valid
       if(validateData()){
        //    fire a register action
           registerUser({name,email,password, isAdmin: false})
       }
    }
    // redirects on register success
    if(isAuthenticated && !loading) {
        return <Redirect  to="/dashboard" />
    }

    return(
        <AuthLayout>
            <Typography variant="h6" align="center" display="block" gutterBottom>
                Welcome, Create Your Account
            </Typography>
            {loading && <Loader/>}
            {errors && <Alert severity="error">{errors}!</Alert>}
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextInput
                    label="Full Name"
                    name="name"
                    type="text"
                    value={name}
                    error={formErr.nameErr}
                    handleInputChange={handleInputChange}/>
                <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    error={formErr.emailErr}
                    handleInputChange={handleInputChange}/>
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    error={formErr.passwordErr}
                    handleInputChange={handleInputChange}/>


                <Grid  container
                       direction="row"
                       justify="space-between"
                       alignItems="center"
                       spacing={2}
                >

                    <Grid item xs={7}>
                        <Typography variant="body2" display="block" gutterBottom>
                              <span>Already have an account?
                                  <ButtonLink linkTo="/login" content="Login"/>
                                   </span>
                        </Typography>
                    </Grid>
                </Grid>

                <PrimaryButton
                    title="Sign Up"
                    type="submit"
                disabled={loading}/>
            </form>

        </AuthLayout>
    )
}

SignUp.propTypes = {
    loading: PropTypes.bool.isRequired,
    registerUser: PropTypes.func.isRequired,
    isAuthenticated:  PropTypes.bool.isRequired,
    user: PropTypes.object,
    errors: PropTypes.string

}
SignUp.defaultProps = {
    loading: false,
    isAuthenticated: false,
    user: {},
    errors: ""
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors


})

export default  connect(mapStateToProps, { registerUser})(SignUp);
