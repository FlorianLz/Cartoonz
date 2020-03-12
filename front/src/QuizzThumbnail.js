import React from "react";
import {Link} from "react-router-dom";

export default function QuizzThumbnail(props)  {
    return (
        <div className={"quizz_card"}>
            <div className="image">
                <img src={"http://localhost:8000/"+props.image} />
            </div>
            <div className="infos">
                <h4 className={"title"}>{props.title}</h4>
                <p>Published by {props.author}</p>
                <Link className={"play_link"} to={'/quizz/'+props.id}>Play</Link>
            </div>
        </div>
    );
}