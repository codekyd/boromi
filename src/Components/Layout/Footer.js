/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */

import React from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles =  makeStyles({
    root: {
        textAlign: 'center',
        background: "#1a268f",
        padding:"20px 10px"

    },
    text: {
        color: '#fff'
    },
    link: {
        color: '#fff'
    }
})

const Footer = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Typography
                variant="body2"
                className={classes.text}>

                Copyright © 2020
                All rights reserved | <a href="/" className={classes.link}>Boromi</a>

            </Typography>

        </Box>
    );
}

export default  Footer