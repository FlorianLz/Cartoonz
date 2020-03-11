import React, {useEffect, useState} from "react";
import QuizzThumbnail from "./QuizzThumbnail";
import axios from 'axios';
import {useCookies, withCookies} from 'react-cookie';
import {Link, Route} from "react-router-dom";

function Home()  {
    const [cookies, removeCookie] = useCookies(['login']);
    const [quizzes, setQuizzes] = useState([]);

    function disconnect() {
        removeCookie('login');
    }

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

    if (cookies.login && cookies.login.username) {
        return (
            <div>
                <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

                <div id="slider">
                    <figure>
                        <img src="images/images_dessins_animes/totallyspies.jpg" alt="img2"/>
                        <img src="images/images_dessins_animes/simpsons.jpg" alt="img3"/>
                        <img src="images/images_dessins_animes/pokemon.png" alt="img1"/>
                        <img src="images/images_dessins_animes/doraexploratrice.jpg" alt="img4"/>
                        <img src="images/images_dessins_animes/minijusticiers.jpg" alt="img5"/>
                    </figure>
                </div>
                <form className={"formsearch"} onSubmit={e=>search(e)}>
                    <input type="search" id="search" placeholder="Search a quizz"/>
                    <input type="submit" id="loupe" value=""/>
                </form>
                {jsxQuizzes}
                <nav className="nav">
                    <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
                    <div className="trophee"></div>
                    <Link to={'/'}><div className="logo_home2"></div></Link>
                    <Link to={'/profil'}><div className="profil"></div></Link>
                    <div className="deconnexion" id="disconnect" onClick={disconnect}></div>
                </nav>

            </div>
        );
    }
    return (
        <div>
            <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

            <div id="slider">
                <figure>
                    <img src="images/images_dessins_animes/totallyspies.jpg" alt="img2"/>
                    <img src="images/images_dessins_animes/simpsons.jpg" alt="img3"/>
                    <img src="images/images_dessins_animes/pokemon.png" alt="img1"/>
                    <img src="images/images_dessins_animes/doraexploratrice.jpg" alt="img4"/>
                    <img src="images/images_dessins_animes/minijusticiers.jpg" alt="img5"/>
                </figure>
            </div>
            <form className={"formsearch"} onSubmit={e=>search(e)}>
                <input type="search" id="search" placeholder="Search a quizz"/>
                <input type="submit" id="loupe" value=""/>
            </form>
            {jsxQuizzes}
            <nav className="nav">
                <Link to={'/addQuiz'}><div className="ajouter"></div></Link>
                <Link to={'/'}><div className="logo_home"></div></Link>
                <Link to={'/login'}><div className="login"></div></Link>
            </nav>
        </div>
    );
}


function LocalProtectedRoute({component: Component, ...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return (
            <Route
                {...rest}
                render={routeProps => (
                    <Component {...routeProps} username={rest.allCookies.login.username}
                               token={rest.allCookies.login.token}/>
                )}
            />
        );
    }
    return <p>!!</p>;
}

function LocalProtectedLink({...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return <Link className={rest.className} to={rest.to}>cities</Link>
    }else{
        return null;
    }
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);

export {ProtectedRoute, ProtectedLink};
export default Home;