import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loadUser} from "../actions/auth";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading},loadUser, ...rest}) => {

	useEffect(() => {
		loadUser()


	}, [])
	return(
		<Route
			{...rest}
			render={props =>  !isAuthenticated && !loading ?
				(<Redirect to="/login"/>) :
				(!loading ? <Component {...props}/> : null)}/>

	)
}






PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
	auth: state.auth,
})


export default connect(mapStateToProps, { loadUser} )(PrivateRoute)