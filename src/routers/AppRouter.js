import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Components/views/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import Dashboard from '../Components/views/user/Dashboard';
import AdminDashboard from '../Components/views/admin/AdminDashboard';
import SingleLoan from '../Components/views/admin/SingleLoan';
import AllLoans from '../Components/views/admin/AllLoans';
import NewLoan from '../Components/views/admin/NewLoan';
import EditLoan from '../Components/views/admin/EditLoan';
import NewLoanRequest from "../Components/views/user/NewLoanRequest";


const AppRouter = () => {
	return(
		<Router>
			<Switch>
				<Route path='/' component={Home} exact/>
				<Route path='/login' component={Login}/>
				<Route path='/signup' component={SignUp}/>
				<AdminRoute path='/admin'  component={AdminDashboard} exact/>
				<AdminRoute path='/admin/loans'  exact component={AllLoans}/>
				<AdminRoute path='/admin/loans/new' component={NewLoan}/>
				<AdminRoute path='/admin/loans/update/:id' component={EditLoan}/>
				<AdminRoute path='/admin/loans/:id' component={SingleLoan}/>
				<UserRoute path='/dashboard' component={Dashboard}/>
				<UserRoute path='/loan-requests/new' component={NewLoanRequest}/>
			</Switch>
		</Router>
	)
}


export  default  AppRouter