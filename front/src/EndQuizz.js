import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useCookies} from 'react-cookie';



export default function EndQuizz(props)  {
    const [cookies, removeCookie] = useCookies(['login']);
    const [myScore, setMyScore] = useState(0);


    if(cookies.login && cookies.login.username){
        async function getMyScore() {
            let username = cookies.login.username;
            const data = (await axios.get('http://localhost:8000/score/'+username)).data;
            let myScore = data[0].score;
            let newscore=myScore+props.score;
            axios.patch('http://localhost:8000/updatescore/'+username+'/'+newscore);
        }
        getMyScore();


        function disconnect() {
            removeCookie('login');
        }
    }
    return (
        <div className="endquiz">
            <h2 className="quizzName">{props.nomquizz}</h2>
            <img src={'http://localhost:8000/'+props.picture} className="imgfinquizz" alt="Picture of the quizz."/>
            <p className="sentencefinish"> Congratulations, you have finish the quizz with a score of : <span className="scoreFinal">{props.score}</span> points.</p>
            <p className="sentencefinish"> You can play at an other quizz on the <Link to={'/'}><div className="lienFinish"> Home Page</div> </Link></p>
        </div>

    );

}