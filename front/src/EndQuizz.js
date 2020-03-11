import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function EndQuizz(props)  {
    return (
        <div className="endquiz">
            <h2 className="quizzName">{props.nomquizz}</h2>
            <img src={'http://localhost:8000/'+props.picture} className="imgfinquizz" alt="Picture of the quizz."/>
            <p className="sentencefinish"> Congratulations, you have finish the quizz with a score of : <span className="scoreFinal">{props.score}</span> points.</p>
            <p className="sentencefinish"> You can play at an other quizz on the <Link to={'/'}><div className="lienFinish"> Home Page</div> </Link></p>
        </div>

    );

}