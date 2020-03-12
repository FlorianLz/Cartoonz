import React from "react";

export default function ProfilThumbnail(props)  {
    return (
        <div>
            <p>{props.username}</p>
            <p> Your score : {props.score}</p>
            <div className={"pwd"}> {props.password}</div>
        </div>
    );
}