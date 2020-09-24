import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Components/views/Home";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Components/views/Dashboard";
import AdminDashboard from "../Components/views/AdminDashboard";


const AppRouter = () => {
	return(
		<Router>
			<Switch>
				<Route path="/" component={Home} exact/>
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={SignUp}/>
				<PrivateRoute path="/dashboard" component={Dashboard}/>
				<PrivateRoute path="/admin-dashboard" component={AdminDashboard}/>
			</Switch>
		</Router>
	)
}


export  default  AppRouter