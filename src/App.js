import React, { useEffect } from 'react';
import './App.css';
import AppRouter from "./routers/AppRouter"
import {loadUser} from "./actions/auth";

const App = () => {
  // loads a user when the app loads
	useEffect(() => {
    const token = localStorage.getItem("token");
			loadUser(JSON.stringify(token))
	},[])
  return (
      < AppRouter/>

  );
}

export default App
