import React, { useState, useEffect } from 'react';
import WritingDisplay from "./WritingDisplay"
import { Link } from 'react-router-dom'

export default function Writing({selectState, userState, url}) {
    const [chapter, setChapter] = useState([])

    const [updateState, setUpdateState] = useState({ title: "Please Select Section", body: "Please Select Section"})
    const [selectedID, setSelectedID] = useState({ id: ""})
   

    const updateChange = (event) => {
        setUpdateState({...updateState, [event.target.id]: event.target.value})
    }
    
    
    let http = `project/${userState}`
    let adition = `project`
    
    useEffect(() => {
        const getChapters = () => {
            fetch(`${url}${http}`)
            .then((res) => res.json())
            .then((res) => {
                setChapter(res)
            })
            .catch((error) => {
                console.log(error);
            });
        };
        getChapters();
    },[http, url]);
    

    async function editFormSubmit(event){
        event.preventDefault();
       
        await fetch(`${url}${adition}`,{
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
            fetch(`${url}${http}`)
            .then((res) => res.json())
            .then((res) => {
                setChapter(res)
                alert('Chapter Saved')
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
        await fetch(`${url}${adition}`, {
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
            fetch(`${url}${http}`)
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
        <div id="writing">
            <p id="writingTitle">Writing component</p>
            <div id="chapterList">
                <button><Link to={'/project'} className="char">Back</Link></button>
                <button onClick={onClickCreate}>Create</button>
                {chapter.map((title) => {
                    if(title.project === selectState){
                        return(
                            <WritingDisplay key={title._id} display={title} updateState={updateState} setUpdateState={setUpdateState} setSelectedID={setSelectedID} http={http} setChapter={setChapter} url={url}/>
                        )
                    }else{
                        return null
                    }
                })}
            </div>
            <div id="editForm">
                <form className="editForm" onSubmit={editFormSubmit}>
                    <input id="title" type="text" placeholder="title" onChange={updateChange} value={updateState.title}></input>
                    <button>Save</button>
                    <textarea id="body" type="test" rows="40" cols="100" onChange={updateChange} value={updateState.body}></textarea>
                </form>
            </div>
        </div>
    );
}
