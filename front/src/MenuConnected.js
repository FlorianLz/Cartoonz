import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function MenuConnected(props)  {
    return (
        <nav className="nav">
            <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
            <div className="trophee"></div>
            <Link to={'/'}><div className="logo_home2"></div></Link>
            <Link to={'/profil'}><div className="profil"></div></Link>
            <div className="deconnexion" id="disconnect" onClick={props.disconnect}></div>
        </nav>

    );

}
