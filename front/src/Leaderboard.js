import React, {useEffect, useState} from "react";
import {Link, Route} from "react-router-dom";
import {useCookies, withCookies} from 'react-cookie';
import axios from "axios";
import LeaderboardThumbnail from "./LeaderboardThumbnail";
import MyLeaderboardThumbnail from "./MyLeaderboardThumbnail";

function Leaderboard()  {
    const [cookies, removeCookie] = useCookies(['login']);
    const [score, setScore] = useState([]);
    const [myscore, setMyscore] = useState([]);

    function disconnect() {
        removeCookie('login');
    }

    let jsxScore = score.map((p,i) => <LeaderboardThumbnail
        key = {p.id}
        username = {p.username}
        score = {p.score}
        position  = {i}
    />)

    let jsxMyscore = <MyLeaderboardThumbnail
        username = {myscore.username}
        score = {myscore.score}
    />

    async function getScore(){
        const data = (await axios.get('http://localhost:8000/users/score')).data;
        setScore(data);
    }

    async function getMyscore(){
        const data = (await axios.get('http://localhost:8000/users/name/'+cookies.login.username)).data;
        setMyscore(myscore.push(data));
        setMyscore(myscore[0]);
    }

    useEffect(() => {
        getScore()
    },[]);

    useEffect(() => {
        getMyscore()
    },[]);

    return (
        <div className={"lead"}>
            <div align="center"><img src="images/logo_final.png" alt="img_logo" className="logo"/></div>
            <h2> Leaderboard</h2>
            {jsxScore}
            {jsxMyscore}
            <nav className="nav">
                <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
                <Link to={'/leaderboard'}><div className="trophee"></div></Link>
                <Link to={'/'}><div className="logo_home2"></div></Link>
                <Link to={'/profil'}><div className="profil"></div></Link>
                <div className="deconnexion" id="disconnect" onClick={disconnect}></div>
            </nav>
        </div>

    );
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
export default Leaderboard;