import React, {useEffect, useState} from "react";
import QuizzThumbnail from "./QuizzThumbnail";
import axios from 'axios';

function Home()  {
    const [quizz, setQuizz] = useState([]);
    async function getQuizzes() {
        const data = (await axios.get('http://localhost:8000/quizzs')).data;
        setQuizz(data);
    }
    useEffect(() => {
        getQuizzes()
    },[]);
    return (
        <div>Home Page <br /><br />
            <QuizzThumbnail title={"Dora l'exploratrice"} date={"06/05/2000"} author={"auteur"} />
            <QuizzThumbnail title={"L'âne trotro"} date={"06/05/2000"} author={"auteur"} />
        </div>

    );
}

export default Home;