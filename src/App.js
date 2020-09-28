import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import AppRouter from "./routers/AppRouter"
import {loadUser} from "./actions/auth";
const App = ({ loadUser }) => {
  // loads a user when the app loads
	useEffect(() => {
    const token = localStorage.getItem("token");
			loadUser(JSON.stringify(token))
	},[])
  return (
      <AppRouter/>

  );
}

export default connect(null, { loadUser })(App);
