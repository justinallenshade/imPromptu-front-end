import React, { useState }  from 'react';
import { Link, Redirect } from 'react-router-dom'

export default function AccountCreate({ url }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginState, setLoginState] = useState({ username: '',email: '', password: ''})

    const createLoginChange = (event) => {
        setLoginState({...loginState, [event.target.id]: event.target.value})
    }
    
    let addition = 'login/create'
    async function createLogin(event){
        event.preventDefault();
        // console.log(loginState)
        
        fetch(`${url}${addition}`, {
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
            alert(data.message)
            setIsLoggedIn(true);
        })
        .catch((error) => {
            console.log('error:', error)
        })
    }

    if(isLoggedIn === true){
        return(
            <Redirect to="/"/>
        )
    }


    return (
        <div className='loginSection'>
            <h1>Account Creation</h1>
            <form id="loginForm" onSubmit={createLogin}>
                <input id="username" type="text" placeholder="username" onChange={createLoginChange} value={loginState.username}></input>
                <input id="email" type="email" placeholder="Email" onChange={createLoginChange} value={loginState.email}></input>
                <input id="password" type="password" placeholder="Password" onChange={createLoginChange} value={loginState.password}></input>
                <input type="submit" className="loginButton" value="Create account"></input>
                <Link to={'/'} className='loginButton'><button>Back</button></Link>
            </form>
        </div>
    );
}
