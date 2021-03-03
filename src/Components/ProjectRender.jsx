import React, { useState }  from 'react';
import { Redirect } from 'react-router-dom'

export default function WritingDisplay({ display, selectChange }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function projectClick(event) {
        event.preventDefault();

        selectChange(display)
        setIsLoggedIn(true)
    }

    if(isLoggedIn === true){
        return(
            <Redirect to="/writing"/>
        )
    }

    return (
        <div>
            <p className="projectDisplay">{display}</p>
            <button className="projectSelect" onClick={projectClick}>Select</button>
        </div>
    );
}