import React, {useEffect, useState} from "react";
import QuizzThumbnail from "./QuizzThumbnail";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {Link} from "react-router-dom";

function Home()  {
    const [cookies] = useCookies(['login']);
    const msg = cookies.login && cookies.login.name ? "connectio OK" : "no coonection";
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
            <p> {msg}</p>
            <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

            <div id="slider">
                <figure>
                    <img src="images/Carousel.png" alt="img1"/>
                    <img src="images/Carousel.png" alt="img2"/>
                    <img src="images/Carousel.png" alt="img3"/>
                    <img src="images/Carousel.png" alt="img4"/>
                    <img src="images/Carousel.png" alt="img5"/>
                </figure>
            </div>
            <form className={"formsearch"} onSubmit={e=>search(e)}>
                <input type="search" id="search" placeholder="Search a quizz"/>
                <input type="submit" id="loupe" value=""/>
            </form>
            {jsxQuizzes}
            <nav className="nav"><div className="ajouter"></div>
                <Link to={'/'}><div className="logo_home"></div></Link>
                <Link to={'/login'}><div className="login"></div></Link>
            </nav>
        </div>
    );
}

export default Home;