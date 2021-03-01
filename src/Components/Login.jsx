import React from 'react';
import { Link } from 'react-router-dom'

export default function Login(props) {

    async function postLogin(event){
        event.preventDefault();

        let form = document.querySelector("form")
        console.log(form)
        const data = new FormData(form)
        console.log(data)

        
        fetch(`http://localhost:4000/login`, {
            method: `post`,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            // where I would pass data and redirect if the data
            // is acceptable 
            console.log('success:', data);
        })
        .catch((error) => {
            console.log('error:', error)
        })
    }


    return (
        <div>
            <h1>Login</h1>
            <form id="loginForm" onSubmit={postLogin}>
                <input type="text" placeholder="username" name="username"></input>
                <input type="text" placeholder="Password" name="password"></input>
                <input type="submit" className="loginButton" value="Login"></input>
                <Link to={'/accountcreation'} className='loginButton'><button>Create Account</button></Link>
            </form>
        </div>
    );
}

