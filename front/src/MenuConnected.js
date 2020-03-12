import React from "react";
import {Link} from "react-router-dom";

export default function MenuConnected(props)  {
    return (
        <nav className="nav">
            <Link to={'/addQuiz'}><div className="ajouter2"/></Link>
            <Link to={'/leaderboard'}><div className="trophee"/></Link>
            <Link to={'/'}><div className="logo_home2"/></Link>
            <Link to={'/profil'}><div className="profil"/></Link>
            <div className="deconnexion" id="disconnect" onClick={props.disconnect}/>
        </nav>
    );
}
