import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Private route to check if a user is authenticated
const UserRoute = ({ component: Component, auth: { isAuthenticated, loading}, ...rest}) => {


	return(
		<Route
			{...rest}
			render={props =>  !isAuthenticated && !loading ?
				(<Redirect to="/login"/>) :
				(!loading ? <Component {...props}/> : null)}/>
	)
}




UserRoute.propTypes = {
	auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
	auth: state.auth,
})


export default connect(mapStateToProps, null )(UserRoute)