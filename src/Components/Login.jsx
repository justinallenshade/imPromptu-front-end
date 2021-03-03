import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'

export default function Login({projectChange, userChange}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginState, setLoginState] = useState({ username: '', password: ''})

    const loginChange = (event) => {
        setLoginState({...loginState, [event.target.id]: event.target.value})
    }
    

    async function postLogin(event){
        event.preventDefault();
        
        await fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginState)
        })
        .then(res => res.json())
        .then(res => {
            // where I would pass data and redirect if the data
            // is acceptable 
            console.log(res.message);
            projectChange(res.data.projects)
            userChange(res.data.username)
            // window.location.assign('http://localhost:3000/project')
            setIsLoggedIn(true);

        })
        .catch((error) => {
            console.log('error:', error)
        })
    }

    if(isLoggedIn === true){
        return(
            <Redirect to="/project"/>
        )
    }

    return (
        <div>
            <h1>Login</h1>
            <form id="loginForm" onSubmit={postLogin}>
                <input id="username" type="text" placeholder="username" onChange={loginChange} value={loginState.username}></input>
                <input id="password" type="password" placeholder="Password" onChange={loginChange} value={loginState.password}></input>
                <input type="submit" className="loginButton" value="Login"></input>
                <Link to={'/accountcreation'} className='loginButton'><button>Create Account</button></Link>
            </form>
        </div>
    );
}

