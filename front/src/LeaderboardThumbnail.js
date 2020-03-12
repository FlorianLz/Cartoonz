import React from "react";
import {useCookies} from 'react-cookie';

export default function LeaderboardThumbnail(props)  {
    const [cookies] = useCookies(['login']);

    if(cookies.login.username === props.username && props.position === 0){
        return(
            <div className={'divlead me'}>
                <div className={'colorgold'}>
                    <p>1st</p>
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
    if(cookies.login.username === props.username && props.position === 1){
        return(
            <div className={'divlead me'}>
                <div className={'colorsilver'}>
                    <p>2nd</p>
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
    if(cookies.login.username === props.username && props.position === 2){
        return(
            <div className={'divlead me'}>
                <div className={'colorbronze'}>
                    <p>3rd</p>
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
    if(cookies.login.username === props.username && props.position > 3 && props.position < 10){
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
    if(props.position === 0){
        return (
            <div className={'divlead'}>
                <div className={'colorgold'}>
                    <p>1st</p>
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

    if(props.position === 1){
        return (
            <div className={'divlead'}>
                <div className={'colorsilver'}>
                    <p>2nd</p>
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

    if(props.position === 2){
        return (
            <div className={'divlead'}>
                <div className={'colorbronze'}>
                    <p>3rd</p>
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

    if(props.position !== 0 && props.position !== 1 && props.position !==2){
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