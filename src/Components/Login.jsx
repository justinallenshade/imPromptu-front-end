import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'

export default function Login({projectChange, userChange, url}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginState, setLoginState] = useState({ username: '', password: ''})

    const loginChange = (event) => {
        setLoginState({...loginState, [event.target.id]: event.target.value})
    }
    
    let adition = 'login'
    async function postLogin(event){
        event.preventDefault();
        
        await fetch(`${url}${adition}`, {
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
            alert(res.message);
            if(res.message === `welcome back ${res.data.username}`){
                projectChange(res.data.projects)
                userChange(res.data.username)
                setIsLoggedIn(true);
            }

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
        <div className="loginSection">
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

