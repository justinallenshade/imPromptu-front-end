import React from 'react';
import { Link } from 'react-router-dom'

export default function AccountCreate(props) {
    return (
        <div>
            <h1>Account create</h1>
            <form className="loginForm"  action="http://localhost:4000/login/create" method="post">
                <input type="text" placeholder="username" name="username"></input>
                <input type="email" placeholder="email" name="email"></input>
                <input type="text" placeholder="Password" name="password"></input>
                <input type="submit" className="loginButton" value="Create Account"></input>
                <Link to={'/login'} className='loginButton'><button>Back</button></Link>
            </form>
        </div>
    );
}
