import React, {useEffect, useState} from "react";
import {useCookies} from 'react-cookie';
import axios from "axios";
import LeaderboardThumbnail from "./LeaderboardThumbnail";
import MyLeaderboardThumbnail from "./MyLeaderboardThumbnail";
import MenuConnected from "./MenuConnected";
import {Redirect} from 'react-router-dom';

function Leaderboard()  {
    const [cookies, removeCookie] = useCookies(['login']);
    const [score, setScore] = useState([]);
    const [myscore, setMyscore] = useState([]);

    function disconnect() {
        removeCookie('login');
        return(
            <Redirect to={'/'} />
        );
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

    if(cookies.login && cookies.login.username){
        return (
            <div className={"lead"}>
                <div align="center"><img src="images/logo_final.png" alt="img_logo" className="logo"/></div>
                <h2> Leaderboard</h2>
                {jsxScore}
                {jsxMyscore}
                <MenuConnected disconnect={e => disconnect()}/>
            </div>

        );
    } else {
        return(
            <Redirect to={'/'} />
        );
    }

}

export default Leaderboard;