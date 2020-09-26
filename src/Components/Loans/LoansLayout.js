import React from 'react';
import { Grid, Typography } from "@material-ui/core"

const LoansLayout = ({ children, title }) => {
    return (
        <>
             <Typography variant="h6">
                 {title}
            </Typography>
            <Grid container spacing={5} justify="center">
                {children}
            </Grid>
        </>
    )
}
export default LoansLayout
