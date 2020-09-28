import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types"

const LoansLayout = ({ children, title, justify }) => {
    return (
        <>
             <Typography variant="h6" gutterBottom>
                 {title}
            </Typography>
            <Grid container spacing={5} justify={justify ? justify : ""}>
                {children}
            </Grid>
        </>
    )
}
LoansLayout.propTypes = {
    children: PropTypes.object.isRequired,
    title: PropTypes.string,
    justify: PropTypes.string
}
export default LoansLayout
