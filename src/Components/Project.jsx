import React, {useState} from 'react';
import ProjectRender from './ProjectRender'

export default function ProjectDisplay({ projectState, selectChange, projectChange, userState }) {
    
    const [newProjectState, setNewProjectState] = useState({ projects: ''})
    
    const newProjectChange = (event) => {
        setNewProjectState({...newProjectState, [event.target.id]: event.target.value})
    }
    
    // will need to for each project name entered 
    //create a unique id for each one
    //can create on onclick function that can grab the
    // value of what was clicked and pass that into the writing display

    async function createProject(event){
        event.preventDefault();
        
        await fetch(`http://localhost:4000/login/${userState}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProjectState)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            projectChange(res)
        })
        .catch((error) => {
            console.log('error:', error)
        })
        
        
        await fetch(`http://localhost:4000/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userState,
                project : newProjectState.projects,
                title : "new chapter"

            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.log('error:', error)
        })
    }


    
    let key =0
    return (
        <div>
            <h1>Project list</h1>
            <form>
                <input id="projects" type="text" placeholder="project name" onChange={newProjectChange} value={newProjectState.projects}></input>
                <button className="createProject" onClick={createProject}>Create project</button>
            </form>
            {projectState.map((project) => {
                key = key +1
                return(
                    <ProjectRender key={key} display={project} selectChange={selectChange}/>
                )
            })}
        </div>
    );
}
