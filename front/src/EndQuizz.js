import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useCookies} from 'react-cookie';



export default function EndQuizz(props)  {
    const [cookies, removeCookie] = useCookies(['login']);
    if(cookies.login && cookies.login.username){


        function disconnect() {
            removeCookie('login');
        }

        let username = cookies.login.username;

        const ancienScore = (axios.get('http://localhost:8000/score/'+username)).data;

        let nvScore=ancienScore+props.score;

        //Maj du score dans la bdd

        axios.patch('http://localhost:8000/updatescore/'+username+'/'+nvScore);
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