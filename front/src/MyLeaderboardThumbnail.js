import React from "react";

export default function MyLeaderboardThumbnail(props)  {
    return (
        <div className={"myScore"}>
            <p>My score : {props.score} pts </p>
        </div>
    );
}

