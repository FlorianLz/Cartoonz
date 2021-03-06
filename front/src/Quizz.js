import React, {useEffect, useState} from "react";
import axios from "axios";
import Answers from "./Answers";
import Video from "./Video";
import EndQuizz from "./EndQuizz";
import {useCookies} from 'react-cookie';
import Menu from "./Menu";
import MenuConnected from "./MenuConnected";

export default function Quizz(props)  {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState([]);
    const [nbQuestions, setNbQuestions] = useState([]);
    const [progression, setProgression] = useState(0);
    const [numQuestion, setNumQuestion] = useState(1);
    const [repChecked, setChecked] = useState([]);
    const [perdu, setPerdu] = useState([]);
    const [nbSoluce, setNbSoluce] = useState(0);
    const [score, setScore] = useState(0);
    const [quizz_name, setQuizzName] = useState([]);
    const [quizz_pic, setQuizzPic] = useState([]);
    let idquizz = props.match.params.id;
    const [cookies, removeCookie] = useCookies(['login']);
    const [video, setVideo] = useState([]);


    /*let jsxQuestion = <Question
        id = {question.id}
        question={question.sentence}
        num_question={numQuestion}
        progression={progression+1}
    />;*/

    function disconnect() {
        removeCookie('login');
    }

    let jsxAnswers = answers.map(p => <Answers
        id = {p.id}
        sentence={p.sentence}
        picture={p.picture_url}
        checked={e => checked(e, p.id)}
    />);

    let jsxVideo = video;

    function next(){
        if(progression < nbQuestions-1){
            repChecked.forEach((item, index)=>{
                getSoluce(question.id,item);
            });
        }else{
            //console.log('Fini : score final : ',myscore);
            repChecked.forEach((item, index)=>{
                getSoluce(question.id,item);
            });
        }
    }

    function suivant(){
        if(progression < nbQuestions-1){
            let suivant=questions[progression+1].id;
            setNumQuestion(suivant);
            setQuestion(questions[progression+1]);
            setNbSoluce(0);
            repChecked.forEach((item, index)=>{
                if(document.getElementById('buttonanswer'+item)){
                    document.getElementById('buttonanswer'+item).classList.remove('checked');
                }
                if(document.getElementById('buttonanswerimg'+item)){
                    document.getElementById('buttonanswerimg'+item).classList.remove('checkedimg');
                }
            });
            setChecked([]);
            setPerdu([]);
            afficherQuestion(suivant);
            getAnswers(suivant);
            getVideo(suivant);
        }
        setProgression(progression+1);
    }

    function aGagne(){
        console.log('perdulength : )',perdu.length);
        if(perdu.length === repChecked.length){
            if(perdu.indexOf(0) != -1){
                console.log('Dommage');
                suivant();
            }else{
                if(perdu.length === nbSoluce){
                    console.log('Bien joué !');
                    console.log(question.score + 'pts');
                    //setScore(score + question.score);
                    setScore(score+question.score);
                    suivant();
                }else{
                    console.log('manque une rep');
                    suivant();
                }
            }
        }
    }

    function checked(e, i){
        if(repChecked.indexOf(i) != -1){
            repChecked.splice(repChecked.indexOf(i),1 );
            console.log(repChecked);
            //e.target.classList.remove("checked");
            if(document.getElementById('buttonanswer'+i)){
                document.getElementById('buttonanswer'+i).classList.remove('checked');
            }
            if(document.getElementById('buttonanswerimg'+i)){
                document.getElementById('buttonanswerimg'+i).classList.remove('checkedimg');
            }

        }else{
            repChecked.push(i);
            console.log(repChecked);
            //e.target.classList.add("checked");
            if(document.getElementById('buttonanswer'+i)){
                document.getElementById('buttonanswer'+i).classList.add('checked');
            }
            if(document.getElementById('buttonanswerimg'+i)){
                document.getElementById('buttonanswerimg'+i).classList.add('checkedimg');
            }
        }
    }

    async function getQuestions() {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz)).data;
        setQuestions(data);
        if(data[0]){
            setQuestion(data[0]);
            setNbQuestions(data.length);
            setNumQuestion(data[0].id);
            afficherQuestion(data[0].id);
            getAnswers(data[0].id);
            setVideo(<Video video={data[0].video_url} />);
        }else{
            setQuestion(data);
            setNbQuestions(1);
            setNumQuestion(data.id);
            afficherQuestion(data.id);
            getAnswers(data.id);
        }

    }
    async function getAnswers(varr) {
        const data = (await axios.get('http://localhost:8000/answer/'+varr)).data;
        setAnswers(data);
    }
    async function getVideo(varr) {
        const data = (await axios.get('http://localhost:8000/video/'+varr)).data;
        setVideo(<Video video={data[0].video_url} />);
        console.log(data[0].video_url)
    }
    async function getSoluce(idq, idr) {
        const data = (await axios.get('http://localhost:8000/soluce/'+idq+'/'+idr)).data;
        console.log(data);
        setPerdu(perdu.push(data[0].solution));
        if(perdu.length === repChecked.length){
            aGagne();
        }
    }
    async function getnbSoluce(idq) {
        const data = (await axios.get('http://localhost:8000/nbsoluce/'+idq)).data;
        setNbSoluce(data[0].count);
    }
    async function afficherQuestion(varr) {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz+'/'+ varr)).data;
        setQuestion(data);
        getnbSoluce(varr);
    }
    async function getQuizzes() {
        const data = (await axios.get('http://localhost:8000/quizz/'+idquizz)).data;
        setQuizzName(data.name);
        setQuizzPic(data.picture_url);
    }

    useEffect(() => {
        getQuestions();
        getQuizzes();
        getAnswers();
    },[]);

    if(progression >= nbQuestions){
        if(cookies.login && cookies.login.username){
            return(
                <div>
                    <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                    <EndQuizz
                        score = {score}
                        nomquizz={quizz_name}
                        picture={quizz_pic}
                    />
                    <MenuConnected disconnect={e => disconnect()}/>
                </div>
            );
        } else {
            return (
                <div>
                    <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                    <EndQuizz
                        score = {score}
                        nomquizz={quizz_name}
                        picture={quizz_pic}
                    />
                    <Menu />
                </div>
            );
        }
    }
    if(question.video_url === null){
        return (
            <div className={'quizzcontent'}>
                <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                <h2 className="quizzName">{quizz_name}</h2>
                <p className="scorePartie">Your score : {score}</p>
                <p className="infosQuestion"> <span className="nbQuestion">Question {progression+1} / {nbQuestions} </span>for {question.score} points </p>
                <h3>{question.sentence}</h3>
                <ul>
                    {jsxAnswers}
                </ul>
                <div className={"buttondiv"}>
                    <div className={"buttondiv validate_button"} onClick={e => next()}>Validate</div>
                </div>


            </div>

        );
    }else{
        return (
            <div className={'quizzcontent'}>
                <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                <h2 className="quizzName">{quizz_name}</h2>
                <p className="scorePartie">Your score : {score}</p>
                <p className="infosQuestion"> <span className="nbQuestion">Question {progression+1} / {nbQuestions} </span>for {question.score} points </p>
                {jsxVideo}
                <ul>
                    {jsxAnswers}
                </ul>
                <div className={"buttondiv"}>
                    <div className={"buttondiv validate_button"} onClick={e => next()}>Validate</div>
                </div>


            </div>

        );
    }


}