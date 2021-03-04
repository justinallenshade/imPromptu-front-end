import React, { useState }  from 'react';
import { Redirect } from 'react-router-dom'

export default function WritingDisplay({ display, selectChange, userState, setProjectState, url }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function projectClick(event) {
        event.preventDefault();

        selectChange(display)
        setIsLoggedIn(true)
    }
    

    async function deleteProject(event){
        event.preventDefault();
        
        let adition1 = `project/${userState}`
        await fetch(`${url}${adition1}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({project: display})
        })
        .then(res => res.json())
        .then(res => {
            let adition2 = `login/${userState}`
            fetch(`${url}${adition2}`, {
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
        <div className="projectList">
            <div>
                <p className="projectDisplay">{display}</p>
            </div>
            <div>
                <button className="projectSelect" onClick={projectClick}>Select</button>
                <button className="deleteProject" onClick={deleteProject}>Delete project</button>
            </div>
        </div>
    );
}