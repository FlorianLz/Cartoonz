import React, {useEffect, useState} from "react";
import axios from "axios";
import Question from "./Question";

export default function Quizz(props)  {
    const [questions, setQuestions] = useState([]);
    const [quizz_name, setQuizzName] = useState([]);
    let idquizz = props.match.params.id;
    let num_question=1;

    let jsxQuestions = questions.map(p => <Question
        id = {p.id}
        question={p.sentence}
        num_question = {num_question++}
        idquizz={idquizz}
        />);

    async function gestQuestions() {
        const data = (await axios.get('http://localhost:8000/question/'+idquizz)).data;
        setQuestions(data);
    }
    async function getQuizzes() {
        const data = (await axios.get('http://localhost:8000/quizz/'+idquizz)).data;
        setQuizzName(data.name);
    }

    useEffect(() => {
        gestQuestions();
        getQuizzes()
    },[]);

    return (
        <div>
            {quizz_name}
            {jsxQuestions}
        </div>

    );

}