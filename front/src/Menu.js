import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Menu()  {
    return (
        <nav className={"nav"}><div className={"ajouter"} />
            <Link to={'/'}><div className={"logo_home"} /></Link>
            <Link to={'/login'}><div className={"login"} /></Link>
        </nav>

    );

}
