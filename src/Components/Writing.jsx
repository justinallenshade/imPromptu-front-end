import React, { useState, useEffect } from 'react';
import WritingDisplay from "./WritingDisplay"
import { Link } from 'react-router-dom'

export default function Writing({selectState, userState}) {
    const [chapter, setChapter] = useState([])

    const [updateState, setUpdateState] = useState({ title: "title", body: ""})
    const [selectedID, setSelectedID] = useState({ id: ""})
   

    const updateChange = (event) => {
        setUpdateState({...updateState, [event.target.id]: event.target.value})
    }
    
    
    let http = `http://localhost:4000/project/${userState}`
    
    useEffect(() => {
        const getChapters = () => {
            fetch(http)
            .then((res) => res.json())
            .then((res) => {
                setChapter(res)
            })
            .catch((error) => {
                console.log(error);
            });
        };
        getChapters();
    },[http]);
    

    async function editFormSubmit(event){
        event.preventDefault();
       
        await fetch(`http://localhost:4000/project`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: selectedID.id,
                title: updateState.title,
                body: updateState.body
            })
        })
        .then(res => res.json())
        .then(res => {
            fetch(http)
            .then((res) => res.json())
            .then((res) => {
                setChapter(res)
                
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log('error:', error)
        })
        
    }

    async function onClickCreate(event){
        event.preventDefault();
        await fetch(`http://localhost:4000/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userState,
                project : selectState,
                title : "new chapter",
                body: ""
            })
        })
        .then(res => res.json())
        .then(res => {
            fetch(http)
            .then((res) => res.json())
            .then((res) => {
                setChapter(res)
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log('error:', error)
        })
    }

    return (
        <div>
            <h1>Writing component</h1>
            <div id="chapterList">
                <button><Link to={'/project'} className="char">Back</Link></button>
                <button onClick={onClickCreate}>Create</button>
                {chapter.map((title) => {
                    if(title.project === selectState){
                        return(
                            <WritingDisplay key={title._id} display={title} updateState={updateState} setUpdateState={setUpdateState} setSelectedID={setSelectedID} http={http} setChapter={setChapter}/>
                        )
                    }else{
                        return null
                    }
                })}
            </div>
            <div id="editForm">
                <form className="editForm" onSubmit={editFormSubmit}>
                    <input id="title" type="text" placeholder="title" onChange={updateChange} value={updateState.title}></input>
                    <textarea id="body" type="test" rows="40" cols="100" onChange={updateChange} value={updateState.body}></textarea>
                    <button>Save</button>
                </form>
            </div>
        </div>
    );
}
