/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */

import React from "react";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import Footer from "../Layout/Footer";


const useStyles =  makeStyles({
    root: {
        minHeight: '100%',
        background: "#1a268f",
        backgroundSize: 'cover',
        height: 'auto'

    },
    authRow: {
        height: '100%',
        padding: '30px 10px'
    },
    authCard: {
        minHeight: '500px',
        background: 'rgba(255,255,255,1)',
        padding: '20px 20px',
        borderRadius: 10
    },
})


const AuthLayout = ({ children}) => {
    const classes = useStyles()

    return(
        <>
            <Box className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    className={classes.authRow}
                >
                    <Grid
                        item
                        md={4}
                        sm={6}
                        xs={12}
                    >

                        <Paper className={classes.authCard}>
                            <Link to="/">
                                <Typography variant="h4" align="center" display="block" gutterBottom>
                                   <img src="/logo192.png" alt="Logo" width="60"/>
                                </Typography>

                            </Link>
                            {children}

                        </Paper>

                    </Grid>

                </Grid>
                <Footer/>
            </Box>

        </>
    )
}
AuthLayout.propTypes = {
    children: PropTypes.array.isRequired
}

export  default  AuthLayout