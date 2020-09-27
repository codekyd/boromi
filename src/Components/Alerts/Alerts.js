import React from 'react'
import Alert from '@material-ui/lab/Alert';
const Alerts = ({ error, successMsg }) => {
    return (
        <>
        {error &&  <Alert severity="error">{error}!</Alert>}
        {successMsg &&  <Alert severity="success">{successMsg}!</Alert>}
        </>
    )
}

export default Alerts
