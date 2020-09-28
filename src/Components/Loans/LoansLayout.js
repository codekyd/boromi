import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types"

const LoansLayout = ({ children, title, justify }) => {
    return (
        <>
             <Typography variant="h6" gutterBottom>
                 {title}
            </Typography>
            <Grid container spacing={5} justify={justify ? justify : "flex-start"}>
                {children}
            </Grid>
        </>
    )
}
LoansLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    title: PropTypes.string,
    justify: PropTypes.string
}
export default LoansLayout
