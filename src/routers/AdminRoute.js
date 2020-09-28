import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loadUser} from "../actions/auth";

// Private route to check if a user is authenticated
const AdminRoute = ({ component: Component, auth: { isAuthenticated, loading},isAdmin,loadUser, ...rest}) => {
	const token = localStorage.getItem("token")
	useEffect(() => {
			loadUser(JSON.stringify(token))
	},[])
	return(
		<Route
			{...rest}
			render={props =>  !isAuthenticated && !loading && !isAdmin ?
				(<Redirect to="/login"/>) :
				(!loading && isAuthenticated ? <Component {...props}/> : null)}/>
	)
}

AdminRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	isAdmin: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	isAdmin: state.auth.user ? state.auth.user.isAdmin : false,
})


export default connect(mapStateToProps, { loadUser} )(AdminRoute)