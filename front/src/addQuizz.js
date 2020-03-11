import React from "react";

function addQuiz()  {

    return (
        <div className={"log"}>
            <h2> Add quizz</h2>
            <form action="#">
                <div className={"infosLog"}>
                    <input type={"text"} placeholder={"Name"} name={"name"}/>
                    <input type={"file"} id="avatar" name="image" />
                    <input type={"text"} placeholder={"keywork"} name={"keywork"}/>
                </div>
                <input type={"submit"} value={"Next"} className={"buttonLog"}/>
            </form>
        </div>

    );
}

export default addQuiz;
