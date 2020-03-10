import React, {useEffect, useState} from "react";
import Answers from "./Answers";
import axios from "axios";

export default function Question(props)  {
    const [answers, setAnswers] = useState([]);

    let jsxAnswers = answers.map(p => <Answers
        id = {p.id}
        sentence={p.sentence}
        picture={p.picture_url}
    />);

    async function getAnswers() {
        const data = (await axios.get('http://localhost:8000/answer/'+props.num_question)).data;
        setAnswers(data);
    }

    useEffect(() => {
        getAnswers();
    },[]);
    return (
        <div>
            <h3>Question {props.num_question} : {props.question} </h3>
            <ul>
                {jsxAnswers}
            </ul>
        </div>

    );

}