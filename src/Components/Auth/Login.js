/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import  {Redirect} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import { connect } from "react-redux"

/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import AuthLayout from "./AuthLayout";
import TextInput from "../Inputs/TextInput";
import {ButtonLink, PrimaryButton} from "../Buttons/Buttons";
import {validateEmail} from "../../utils/helpers";
import { loginUser} from "../../actions/auth";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
import Alerts from "../Alerts/Alerts";

const useStyles =  makeStyles({
    root: {
        textAlign: 'right'
    },
})

const Login = ({ isAuthenticated, loading, error, isAdmin, loginUser}) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const { email, password} = loginData;
    const [formErr, setFormErr] = useState({});
    const handleInputChange = (e) => {
        setLoginData({...loginData, [e.currentTarget.name]  : e.currentTarget.value.trim()});
    }
    // validates the inputs before sending an action
    const validateData = () => {
        let errors = { }
        errors.emailErr = validateEmail(email) ? "": "Email Address is Invalid"
        errors.passwordErr = password ? "" : "Password is required"
        setFormErr({
            ...errors
        })
        return Object.values(errors).every(x => x === "")
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(validateData()){
            loginUser({email, password})

        }
    }
    const classes = useStyles()
    if(isAuthenticated  && isAdmin && !loading) {

        return <Redirect  to="/admin" />

    }
    if(isAuthenticated && !loading) {
        return <Redirect  to="/dashboard" />
    }
    return (
        <AuthLayout>
            {loading && <Loader/>}
            <Typography variant="h6" align="center" display="block" gutterBottom>
                Welcome, Login
            </Typography>
            <Alerts error={error}/>

            <form noValidate autoComplete="off" onSubmit={onSubmit}>
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
                        <Grid item xs={5}>
                            <Typography variant="body2" display="block" gutterBottom>
                            <ButtonLink linkTo="/forget-password" content="Forget Password"/>
                            </Typography>
                        </Grid>
                        <Grid item xs={7} className={classes.root}>
                            <Typography variant="body2" display="block" gutterBottom>
                              <span>New User?
                                       <ButtonLink linkTo="/signup" content="Sign Up"/>
                                   </span>
                            </Typography>
                        </Grid>
                    </Grid>

                <PrimaryButton
                title="Login" type="submit" disabled={loading}/>


            </form>

        </AuthLayout>
    )
}
Login.propTypes = {
    loading: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    isAuthenticated:  PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    errors: PropTypes.string

}
Login.defaultProps = {
    loading: false,
    isAuthenticated: false,
    isAdmin: false,
    errors: ""
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.user ? state.auth.user.isAdmin : false,
    error: state.auth.error

})
export default connect(mapStateToProps, {loginUser})(Login)