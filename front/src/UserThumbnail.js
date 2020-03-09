import React from "react";

export default function UserThumbnail(props)  {
    return (
        <div>
            <p>Nom de l'utilisateur : {props.name}</p>
        </div>
    );
}