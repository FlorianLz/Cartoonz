import React, {useEffect, useState} from "react";
import axios from "axios";
import Question from "./Question";
import Answers from "./Answers";
import {Link} from "react-router-dom";

export default function Quizz(props)  {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState([]);
    const [quizz_name, setQuizzName] = useState([]);
    let idquizz = props.match.params.id;
    let num_question=1;

    let jsxQuestions = questions.map(p => <Question
        id = {p.id}
        question={p.sentence}
        num_question = {num_question++}
        idquizz={idquizz}
        />);

    async function getQuestions() {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz)).data;
        setQuestions(data);
    }
    async function afficherQuestion(num_question) {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz+'/'+num_question)).data;
        setQuestion(data);
    }
    async function getQuizzes() {
        const data = (await axios.get('http://localhost:8000/quizz/'+idquizz)).data;
        setQuizzName(data.name);
    }

    useEffect(() => {
        getQuestions();
        getQuizzes();
        afficherQuestion(1);
    },[]);

    return (
        <div className={'quizzcontent'}>
            <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
            <h4>{quizz_name}</h4>
            {jsxQuestions}
            <div class={"buttondiv"}><Link className={"validate_button"} to={'/validate'}>Valider</Link></div>
        </div>

    );

}