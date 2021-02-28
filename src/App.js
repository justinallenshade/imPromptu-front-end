import './App.css';
import React from "react"
import { Route } from 'react-router-dom'

import Writing from './Components/Writing'
import Login from './Components/Login'
import AccountCreate from './Components/AccountCreate'

export default function App() {
  return (
    <div className="App">
      <Route path="/writing" exact render={() => <Writing/>} /> 
      <Route path="/login" exact render={() => <Login/>} /> 
      <Route path="/accountcreation" exact render={() => <AccountCreate/>} /> 
    </div>
  );
}


