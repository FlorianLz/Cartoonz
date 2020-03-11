import React from "react";
import {Link} from "react-router-dom";

function addQuiz()  {

    return (
        <div className={"log"}>
            <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
            <h2> Add quizz</h2>
            <form action="#">
                <div className={"infosLog"}>
                    <input type={"text"} placeholder={"Name"} name={"name"}/>
                    <input type={"file"} id="avatar" name="image" />
                    <input type={"text"} placeholder={"keywork"} name={"keywork"}/>
                </div>
                <input type={"submit"} value={"Next"} className={"buttonLog"}/>
            </form>
            <nav className="nav">
                <div className="trophee"></div>
                <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
                <Link to={'/'}><div className="logo_home2"></div></Link>
                <Link to={'/login'}><div className="profil"></div></Link>
            </nav>
        </div>

    );
}

export default addQuiz;
