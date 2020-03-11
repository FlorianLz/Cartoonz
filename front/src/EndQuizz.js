import React, {useEffect, useState} from "react";

export default function EndQuizz(props)  {
    return (
        <li><h2>{props.nomquizz}</h2><p>{props.score}</p>
            <img src={'http://localhost:8000/'+props.picture} alt="Picture of the quizz."/>
        </li>
    );

}