import React, {useEffect, useState} from "react";
import axios from "axios";
import Question from "./Question";
import Answers from "./Answers";
import {Link} from "react-router-dom";

export default function Quizz(props)  {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState([]);
    const [nbQuestions, setNbQuestions] = useState([]);
    const [progression, setProgression] = useState(0);
    const [numQuestion, setNumQuestion] = useState(1);
    const [quizz_name, setQuizzName] = useState([]);
    let idquizz = props.match.params.id;

    /*let jsxQuestion = <Question
        id = {question.id}
        question={question.sentence}
        num_question={numQuestion}
        progression={progression+1}
    />;*/

    let jsxAnswers = answers.map(p => <Answers
        id = {p.id}
        sentence={p.sentence}
        picture={p.picture_url}
    />);

    function next(){
        if(progression < nbQuestions-1){
            let suivant=questions[progression+1].id;
            setNumQuestion(suivant);
            setProgression(progression+1);
            setQuestion(questions[progression+1]);
            afficherQuestion(suivant);
            getAnswers(suivant);
        }

    }

    async function getQuestions() {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz)).data;
        setQuestions(data);
        setQuestion(data[0]);
        setNbQuestions(data.length);
        setNumQuestion(data[0].id);
        afficherQuestion(data[0].id);
        getAnswers(data[0].id);
    }
    async function getAnswers(varr) {
        const data = (await axios.get('http://localhost:8000/answer/'+varr)).data;
        setAnswers(data);
    }
    async function afficherQuestion(varr) {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz+'/'+ varr)).data;
        setQuestion(data);
        console.log(data);
    }
    async function getQuizzes() {
        const data = (await axios.get('http://localhost:8000/quizz/'+idquizz)).data;
        setQuizzName(data.name);
    }

    useEffect(() => {
        getQuestions();
        getQuizzes();
        getAnswers();
    },[]);

    return (
        <div className={'quizzcontent'}>
            <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
            <h4>{quizz_name}</h4>
            <p>{progression+1} / {nbQuestions} questions</p>
            <h3>{question.sentence}</h3>
            <ul>
                {jsxAnswers}
            </ul>
            <div className={"buttondiv"}><div className={"buttondiv validate_button"} onClick={e => next()}>Valider</div></div>
            <nav className="nav"><div className="ajouter"></div>
                <Link to={'/'}><div className="logo_home"></div></Link>
                <Link to={'/login'}><div className="login"></div></Link>
            </nav>
        </div>

    );

}