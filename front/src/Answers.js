import React, {useEffect, useState} from "react";

export default function Answer(props)  {
    let picture=[];
    if (props.picture){
        picture.push(<img className={'imganswer'} src={"http://localhost:8000/" + props.picture} />);
    }
    return (
        <li><div id={'buttonanswer'+props.id} className={'buttonanswer'} onClick={props.checked}>{props.sentence}{picture}</div></li>
    );

}