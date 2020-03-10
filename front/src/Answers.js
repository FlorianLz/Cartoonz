import React, {useEffect, useState} from "react";

export default function Answer(props)  {
    let picture=[];
    if (props.picture){
        picture.push(<img className={'imganswer'} src={"http://localhost:8000/" + props.picture} />);
    }
    return (
            <li><input type="checkbox" ref={props.id}/> {props.sentence}{picture}</li>
    );

}