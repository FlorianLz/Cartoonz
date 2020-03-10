import React, {useEffect, useState} from "react";
import QuizzThumbnail from "./QuizzThumbnail";
import axios from 'axios';

function Home()  {
    const [quizzes, setQuizzes] = useState([]);

    let jsxQuizzes = quizzes.map(p => <QuizzThumbnail
        id = {p.id}
        title={p.name}
        date={p.date}
        author={p.author}
        image={p.picture_url}/>)

    async function getQuizzes() {
        const data = (await axios.get('http://localhost:8000/quizz')).data;
        setQuizzes(data);
    }

    useEffect(() => {
        getQuizzes()
    },[]);

    return (
        <div>
            <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

            <div id="slider">
                <figure>
                    <img src="images/Carousel.png" alt/>
                    <img src="images/Carousel.png" alt/>
                    <img src="images/Carousel.png" alt/>
                    <img src="images/Carousel.png" alt/>
                    <img src="images/Carousel.png" alt/>
                </figure>
            </div>
            {jsxQuizzes}
        </div>

    );
}

export default Home;