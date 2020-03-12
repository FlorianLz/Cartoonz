import React from "react";
import {Link} from "react-router-dom";
import MenuConnected from "./MenuConnected";
import {useCookies, withCookies} from 'react-cookie';

export default function FinAjoutQuizz(props)  {
    const [cookies, removeCookie] = useCookies(['login']);

    function disconnect() {
        removeCookie('login');
    }
    console.log(props);
    return (
        <div className={"log"}>
            <div align="center"><img src="images/logo_final.png" alt="img_logo" className="logo"/></div>
            <h2> Congratulations</h2>
            <p> You have finish the creation of <span className={"nameQuiz"}> {props.nomquizz} </span>.</p>
            <img src={props.imgquizz} alt={props.idquizz} className={"imgfinquizz"}/>
            <p className={"textFinal"}> Thank you for your participation to build Cartoon'z.
                You can go back to the <Link to={'/'}><div className={"linkHome"}>Home Page</div></Link> to play at your quizz.</p>
            <MenuConnected disconnect={e => disconnect()}/>
        </div>
    );
}