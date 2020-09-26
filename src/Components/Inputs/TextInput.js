/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import React from "react";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Layout from "../Layout/Layout";

const useStyles =  makeStyles({
    root : {
        fontFamily: '"gt"',
        width: '100%',
        margin: '15px 0',
        '& label': {
            fontSize: 15,
            '&.Mui-focused': {
                color: '#5f67b1',
            },
        },
        '& .MuiOutlinedInput-root': {
            '&': {

            },
            '& fieldset': {
                borderWidth: 1,
                borderColor: '#9e9e9e'

            },
            '&:hover fieldset': {
                borderColor: '#9e9e9e',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#a3a8d2',
                borderWidth: 1
            },
        },
    },
})

const TextInput = ({
                       label,
                       name,
                       type,
                       value,
                       error,
                       handleInputChange}) => {
    const classes = useStyles()
    return(
        <TextField id={name}
                   className={classes.root}
                   label={label}
                   variant="outlined"
                   error={!!error}
                   type={type}
                   name={name}
                   value={value}
                   helperText={error}
                   onChange={handleInputChange}/>
    )
}
TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    value:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    error: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired
};

export default  TextInput