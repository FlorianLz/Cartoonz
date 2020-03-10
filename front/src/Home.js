import React, {useEffect, useState} from "react";
import QuizzThumbnail from "./QuizzThumbnail";
import axios from 'axios';
import {Link} from "react-router-dom";

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

            <nav className="nav"><div className="ajouter"></div>
            <Link to={'/'}><div className="logo_home"></div></Link>
            <Link to={'/login'}><div className="login"></div></Link></nav>
        </div>

    );
}

export default Home;