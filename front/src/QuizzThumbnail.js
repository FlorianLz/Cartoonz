import React from "react";

export default function QuizzThumbnail(props)  {
    return (
        <div>
            Title : {props.title}
            <br />
            Date : {props.date}
            <br />
            Author : {props.author}
            <br /><br />
        </div>
    );
}