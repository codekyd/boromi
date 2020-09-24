import React, {useEffect} from "react";
import AppNav from "../Drawer/Drawer";
import { connect} from "react-redux";
import {Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";


const  AdminDashboard = ({ getAllEvents, allEvents, loading}) => {
	useEffect(() => {

	}, [])
	return(
		<AppNav>

		</AppNav>
	)
}
const mapStateToProps = state => ({
})
export default  connect(mapStateToProps, {})(AdminDashboard);