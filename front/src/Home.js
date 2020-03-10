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
    async function search(e) {
        e.preventDefault();
        let txt = e.target.elements[0].value;
        const data = (await axios.get('http://localhost:8000/recherche/'+txt)).data;
        console.log(data);
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
            <form className={"formsearch"} onSubmit={e=>search(e)}>
                <input type="search" id="search" placeholder="Search a quizz"/>
                <input type="submit" id="loupe" value=""/>
            </form>
            {jsxQuizzes}
        </div>

    );
}

export default Home;