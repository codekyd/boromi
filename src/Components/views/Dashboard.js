import React from "react";
import { connect } from "react-redux";
import {Typography} from "@material-ui/core";

const Dashboard = () => {
return(
	<>
		<Typography>
			Hi User
		</Typography>
	</>
)

}


const mapStateToProps = state => ({
	user: state.auth.user
})

export default  connect(mapStateToProps, null)(Dashboard)