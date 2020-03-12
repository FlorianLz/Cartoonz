import React from "react";
import {useCookies} from 'react-cookie';

export default function LeaderboardThumbnail(props)  {
    const [cookies] = useCookies(['login']);

    if(cookies.login.username === props.username){
        if(props.position <3){
            return(
                <div className={'divlead me'}>
                    <div className={'color'+props.position}>
                        <p>{props.position+1}</p>
                    </div>
                    <div>
                        <span>{props.username}</span>
                    </div>
                    <div>
                        <p>{props.score} pts </p>
                    </div>
                </div>
            );
        } else {
            return(
                <div className={'divlead me'}>
                    <div className={'color'}>
                        <p>{props.position+1}</p>
                    </div>
                    <div>
                        <span>{props.username}</span>
                    </div>
                    <div>
                        <p>{props.score} pts </p>
                    </div>
                </div>
            );
        }
    } else {
        if(props.position <3){
            return (
                <div className={'divlead'}>
                    <div className={'color'+props.position}>
                        <p>{props.position+1}</p>
                    </div>
                    <div>
                        <span>{props.username}</span>
                    </div>
                    <div>
                        <p>{props.score} pts </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'divlead'}>
                    <div className={'color'}>
                        <p>{props.position+1}</p>
                    </div>
                    <div>
                        <span>{props.username}</span>
                    </div>
                    <div>
                        <p>{props.score} pts </p>
                    </div>
                </div>
            );
        }
    }

}