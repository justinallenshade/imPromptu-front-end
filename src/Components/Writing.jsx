import React, { useState, useEffect } from 'react';
import WritingDisplay from "./WritingDisplay"

export default function Writing({selectState, userState}) {
    const [chapter, setChapter] = useState([])

    console.log(userState)
    console.log(selectState)

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


    return (
        <div>
            <h1>Writing component</h1>
            <div>
                {chapter.map((title) => {
                    if(title.project === selectState){
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
