import React, { useState }  from 'react';
import { Link, Redirect } from 'react-router-dom'

export default function AccountCreate(prop) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginState, setLoginState] = useState({ username: '',email: '', password: ''})

    const createLoginChange = (event) => {
        setLoginState({...loginState, [event.target.id]: event.target.value})
    }
    

    async function createLogin(event){
        event.preventDefault();
        // console.log(loginState)
        
        fetch(`http://localhost:4000/login/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginState)
        })
        .then(res => res.json())
        .then(data => {
            // where I would redirect if the data
            // is acceptable and display account created
            console.log('success:', data);
            setIsLoggedIn(true);
        })
        .catch((error) => {
            console.log('error:', error)
        })
    }

    if(isLoggedIn === true){
        return(
            <Redirect to="/login"/>
        )
    }


    return (
        <div>
            <h1>Account Creation</h1>
            <form id="loginForm" onSubmit={createLogin}>
                <input id="username" type="text" placeholder="username" onChange={createLoginChange} value={loginState.username}></input>
                <input id="email" type="email" placeholder="Email" onChange={createLoginChange} value={loginState.email}></input>
                <input id="password" type="password" placeholder="Password" onChange={createLoginChange} value={loginState.password}></input>
                <input type="submit" className="loginButton" value="Create account"></input>
                <Link to={'/login'} className='loginButton'><button>Back</button></Link>
            </form>
        </div>
    );
}
