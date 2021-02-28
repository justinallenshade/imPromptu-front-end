import React, { useState, useEffect } from 'react';
import WritingDisplay from "./WritingDisplay"

export default function Writing(props, select) {
   
    const [chapter, setChapter] = useState([])

    // get grabbed from the users username on login
    // and from the project list that is in the users
    const projectName = 'project 1'
    const username = "Shane"

    let http = `http://localhost:4000/project/${username}`

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


    return (
        <div>
            <h1>Writing component</h1>
            <div>
                {chapter.map((title) => {
                    if(title.project === projectName){
                        return(
                            <WritingDisplay key={title._id} display={title}/>
                        )
                    }else{
                        return null
                    }
                })}
            </div>
        </div>
    );
}
