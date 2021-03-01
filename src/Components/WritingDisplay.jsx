import React from 'react';

export default function WritingDisplay({ display }) {
    let title = display.title
    let project = display.project
    let body = display.body

    console.log(display)
    return (
        <div>
            <p>project is {project}</p>
            <p>title is {title}</p>
            <p>{body}</p>
        </div>
    );
}

