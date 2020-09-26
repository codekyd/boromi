/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */

import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";


//CO
const useStyles =  makeStyles({

    root: {
        margin: "20px 0",
        padding: "10px 18px"

    },
    buttonLink: {
        color: "#1a268f",
        textDecoration: "none"
    },
    secondaryLink: {
        color: "#ffd467",
        padding: "10px 30px",
        marginTop: "30px",
        fontSize: "17px",
        borderRadius: "2px",
        border: "1.5px solid #ffd467",
        display: "inline-block",
        textDecoration: "none"
    }
})


export const ButtonLink = ({ linkTo, content}) => {
    const classes = useStyles()
    return (<Link to={linkTo} className={classes.buttonLink}> {content}</Link>

    )
}


ButtonLink.propTypes = {
    linkTo: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,

}


export const PrimaryButton = ({title, type, disabled}) => {
    const classes = useStyles()
    return(
        <Button variant="contained"
                color="primary"
                fullWidth
                type={type}
                disabled={disabled}
                className={classes.root}>
            {title}
        </Button>
    )
}

PrimaryButton.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool

}


export const SecondaryButton = ({ linkTo,content}) => {
    const classes = useStyles()
    return(
        <Link
            to={linkTo}
            className={classes.secondaryLink}>
            {content}
        </Link>
    )
}
SecondaryButton.propTypes = {
    linkTo: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired

}