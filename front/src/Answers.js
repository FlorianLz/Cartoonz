import React, {useEffect, useState} from "react";
import axios from "axios";
import Question from "./Question";
import Answers from "./Answers";

export default function Answer(props)  {
    let picture=[];
    if (props.picture){
        picture.push(<img className={'imganswer'} src={"http://localhost:8000/" + props.picture} />);
    }
    return (
            <li><input type="checkbox" /> {props.sentence}{picture}</li>
    );

}