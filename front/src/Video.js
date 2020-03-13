import React from "react";

export default function Video(props)  {
        return (
            <video width="320" height="240" autoPlay>
                <source src={"http://localhost:8000/"+props.video} type="video/mp4" />
            </video>
        );
}