import React from "react";

export default function QuizzThumbnail(props)  {
    return (
        <div className={"quizz_card"}>
            <div className="image">
                <img src={props.image} />
            </div>
            <div className="infos">
                <p className={"title"}>{props.title}</p>
                <p>Published on 09/03/2020 by user</p>
            </div>
        </div>
    );
}