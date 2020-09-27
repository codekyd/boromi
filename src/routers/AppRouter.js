import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Components/views/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Components/views/Dashboard';
import AdminDashboard from '../Components/views/AdminDashboard';
import SingleLoan from '../Components/views/SingleLoan';
import AllLoans from '../Components/views/AllLoans';
import NewLoan from '../Components/views/NewLoan';
import EditLoan from '../Components/views/EditLoan';


const AppRouter = () => {
	return(
		<Router>
			<Switch>
				<Route path='/' component={Home} exact/>
				<Route path='/login' component={Login}/>
				<Route path='/signup' component={SignUp}/>
				<PrivateRoute path='/dashboard' component={Dashboard}/>
				<Route path='/admin-dashboard' component={AdminDashboard}/>
				<Route path='/loans'  exact component={AllLoans}/>
				<Route path='/loans/new' component={NewLoan}/>
				<Route path='/loans/update/:id' component={EditLoan}/>
				<Route path='/loans/:id' component={SingleLoan}/>
			</Switch>
		</Router>
	)
}


export  default  AppRouter