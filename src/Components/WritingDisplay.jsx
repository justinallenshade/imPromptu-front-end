import React from 'react';

export default function WritingDisplay({ display, setUpdateState, setSelectedID, http, setChapter}) {
    let title = display.title
    let body = display.body
    let id = display._id

    
    async function selectProject(event){
        event.preventDefault();
        setUpdateState({title: title, body: body})
        setSelectedID({id: id})
    }

    async function onClickDelete(event){
        event.preventDefault();
        await fetch(`http://localhost:4000/project`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
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
        <div className="selectProject">
            <p>{title}</p>
            <button onClick={selectProject}>Select</button>
            <button onClick={onClickDelete}>Delete</button>
        </div>
    );
}

