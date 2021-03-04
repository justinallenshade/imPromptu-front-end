import React, { useState }  from 'react';
import { Redirect } from 'react-router-dom'

export default function WritingDisplay({ display, selectChange, userState, setProjectState }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function projectClick(event) {
        event.preventDefault();

        selectChange(display)
        setIsLoggedIn(true)
    }
    

    async function deleteProject(event){
        event.preventDefault();
        
        await fetch(`http://localhost:4000/project/${userState}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({project: display})
        })
        .then(res => res.json())
        .then(res => {
            fetch(`http://localhost:4000/login/${userState}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userState,
                    project : display,
                })
            })
            .then(res => res.json())
            .then(res => {
                setProjectState(res)
            })
            .catch((error) => {
                console.log('error:', error)
            })
        })
        .catch((error) => {
            console.log('error:', error)
        })
    }


    if(isLoggedIn === true){
        return(
            <Redirect to="/writing"/>
        )
    }

    return (
        <div>
            <div>
                <p className="projectDisplay">{display}</p>
                <button className="projectSelect" onClick={projectClick}>Select</button>
            </div>
            <div>
                <button className="createProject" onClick={deleteProject}>Delete project</button>
            </div>
        </div>
    );
}