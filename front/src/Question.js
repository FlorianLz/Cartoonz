import React from "react";

export default function Question(props)  {
    return (
        <div>
            Question {props.num_question} : {props.question}
        </div>
    );

}