import React, {useEffect, useState} from "react";
import {Link, Route} from "react-router-dom";
import {useCookies, withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';
import axios from "axios";
import ProfilThumbnail from "./ProfilThumbnail";

function Profil(){
    const [cookies, removeCookie] = useCookies(['login']);
    const [infos, setInfos] = useState([]);

    function disconnect() {
        removeCookie('login');
    }

    let jsxInfos = <ProfilThumbnail
        id = {infos.id}
        username = {infos.username}
        password = {infos.password}
        avatar = {infos.avatar}
        score = {infos.score}
    />;

    async function getInfos(){
        const perso = cookies.login.username;
        const data = (await axios.get('http://localhost:8000/users/name/'+perso)).data;
        setInfos(infos.push(data));
        setInfos(infos[0]);
    }

    useEffect(() => {
        getInfos()
    },[]);

    if (cookies.login && cookies.login.username){
        return(
            <div className={"log"}>
                <div align="center"><img src="images/logo_final.png" alt="img_logo" className="logo"/></div>
                <h2> My Profil </h2>
                {jsxInfos}
                <nav className="nav">
                    <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
                    <Link to={'/leaderboard'}><div className="trophee"></div></Link>
                    <Link to={'/'}><div className="logo_home2"></div></Link>
                    <Link to={'/profil'}><div className="profil"></div></Link>
                    <div className="deconnexion" id="disconnect" onClick={disconnect}></div>
                </nav>
            </div>
        );
    } else {
        return(
            <Redirect to='/'/>
        );
    }

}

function LocalProtectedRoute({component: Component, ...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return (
            <Route
                {...rest}
                render={routeProps => (
                    <Component {...routeProps} username={rest.allCookies.login.username}
                               token={rest.allCookies.login.token}/>
                )}
            />
        );
    }
    return <p>!!</p>;
}

function LocalProtectedLink({...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return <Link className={rest.className} to={rest.to}>cities</Link>
    }else{
        return null;
    }
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);

export {ProtectedRoute, ProtectedLink};

export default Profil;