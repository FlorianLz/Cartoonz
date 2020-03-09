import React from "react";

export default function QuizzThumbnail(props)  {
    return (
        <div className={"quizz_card"}>
            <div className="image">

            </div>
            <div className="infos">
                <p>Title : {props.title}</p>
                <p>Published on {props.date}</p>
                <p>by {props.author}</p>
            </div>
        </div>
    );
}