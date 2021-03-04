import './App.css';
import React, { useState }  from "react"
import { Route } from 'react-router-dom'

import Writing from './Components/Writing'
import Login from './Components/Login'
import AccountCreate from './Components/AccountCreate'
import Projects from './Components/Project'

export default function App() {

  
  // let url = `http://localhost:4000/`
  let url = `https://impromptu-back-end.herokuapp.com/`

  const [userState, setUserState] = useState({ username: ''})
  const [projectState, setProjectState] = useState({ project: []})
  const [selectState, setSelectState] = useState({ project: ''})

  
  const projectChange = (projects) => {
    setProjectState(projects)
    sessionStorage.setItem("projects", projects)
  }
  if(sessionStorage.getItem("projects") !== null){
    let savedProjects = sessionStorage.getItem("projects").split(',')
    // console.log(savedProjects)
    // console.log(projectState)
    if(savedProjects !== projectState){
      // console.log('set state here')
    }
  }
  
  const userChange = (user) => {
    setUserState(user)
  }

  const selectChange = (project) => {
    setSelectState(project)
  }


  // console.log(projectState, userState, selectState)
  return (
    <div className="App">
      <Route path="/writing" exact render={() => <Writing selectState={selectState} userState={userState} url={url}/>} /> 
      <Route path="/" exact render={() => <Login projectChange={projectChange} userChange={userChange} url={url}/>} /> 
      <Route path="/accountcreation" exact render={() => <AccountCreate url={url}/>} /> 
      <Route path="/project" exact render={() => <Projects projectState={projectState} userState={userState} selectChange={selectChange} projectChange={projectChange} setProjectState={setProjectState} url={url}/>} /> 
    </div>
  );
}


