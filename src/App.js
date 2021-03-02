import './App.css';
import React, { useState }  from "react"
import { Route } from 'react-router-dom'

import Writing from './Components/Writing'
import Login from './Components/Login'
import AccountCreate from './Components/AccountCreate'
import Projects from './Components/Project'

export default function App() {
  

  const [userState, setUserState] = useState({ username: ''})
  const [projectState, setProjectState] = useState({ project: []})

  const projectChange = (projects) => {
    setProjectState(projects)
  }

  const userChange = (user) => {
    setUserState(user)
  }


  console.log(projectState, userState)
  return (
    <div className="App">
      <Route path="/writing" exact render={() => <Writing/>} /> 
      <Route path="/login" exact render={() => <Login projectChange={projectChange} userChange={userChange}/>} /> 
      <Route path="/accountcreation" exact render={() => <AccountCreate/>} /> 
      <Route path="/project" exact render={() => <Projects projectState={projectState}/>} /> 
    </div>
  );
}


