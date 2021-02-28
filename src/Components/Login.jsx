import React from 'react';
import { Link } from 'react-router-dom'

export default function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <form className="loginForm" action="http://localhost:4000/login" method="post">
                <input type="text" placeholder="username" name="username"></input>
                <input type="text" placeholder="Password" name="password"></input>
                <input type="submit" className="loginButton" value="Login"></input>
                <Link to={'/accountcreation'} className='loginButton'><button>Create Account</button></Link>
            </form>
        </div>
    );
}

