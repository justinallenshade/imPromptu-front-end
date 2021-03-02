import React from 'react';
import { Link } from 'react-router-dom'

export default function ProjectDisplay(projectState) {
    
    //grab the list and username in here
    // map through the list and display each 
    
    
    // will need to for each project name entered 
    //create a unique id for each one
    //can create on onclick function that can grab the
    // value of what was clicked and pass that into the writing display

    return (
        <div>
            {projectState.map((project) => {
                return(
                    <p>{project}</p>
                )
            })}
        </div>
    );
}
