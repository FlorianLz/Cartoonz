import React, {useState} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {useCookies, withCookies} from 'react-cookie';
import Menu from "./Menu";
import MenuConnected from "./MenuConnected";
import axios from 'axios';

function AddQuiz()  {
    const [cookies, removeCookie] = useCookies(['login']);
    const [cree, setCree] = useState(0);
    const [nomQuizz, setNomQuizz] = useState('');

    function disconnect() {
        removeCookie('login');
    }

    function get_extension(path) {
        var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
            // (supports `\\` and `/` separators)
            pos = basename.lastIndexOf('.');       // get last position of `.`

        if (basename === '' || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)

        return basename.slice(pos + 1);            // extract extension ignoring `.`
    }

    function creation(e) {
        e.preventDefault();
        if(e.target.elements[0].value == '' || e.target.elements[2].value == '' ){
            console.log('merci de remplir tous les champs');
        }else{
            let time=new Date().getTime();
            const selectedFile = e.target.myfile.files[0];
            const data = new FormData();
            data.append('file', selectedFile, selectedFile.name);
            data.append('name', e.target.elements[0].value);
            data.append('extension', get_extension(selectedFile.name));
            data.append('username', cookies.login.username);
            data.append('time', time);
            axios.post("http://localhost:8000/upload", data).then(res => console.log("Res", res));
            let p = {
                name : e.target.elements[0].value,
                keywords : e.target.elements[2].value,
                username: cookies.login.username,
                image: selectedFile.name,
                extension : get_extension(selectedFile.name),
                time : time,
            };
            axios.post('http://localhost:8000/createquizz', p).then(res => console.log(res));
            setNomQuizz(e.target.elements[0].value);
            setCree(1);
        }
    }
    if(cree === 0){
        if (cookies.login && cookies.login.username){
            return (
                <div className={"log"}>
                    <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                    <h2> Add a quizz</h2>
                    <form onSubmit={e => creation(e)}>
                        <div className={"infosLog"}>
                            <input type={"text"} placeholder={"Name of the quiz"} name={"name"} required/>
                            <input type={"file"} id="avatar" name="myfile" />
                            <input type={"text"} placeholder={"Keywords about the theme of your quiz"} name={"keywork"} required/>
                        </div>
                        <input type={"submit"} value={"Next"} className={"buttonLog"}/>
                    </form>
                    <MenuConnected disconnect={e => disconnect()}/>
                </div>

            );
        } else {
            return (
                <div className={"log"}>
                    <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

                    <h2> Add a quizz </h2>
                    <p> If you want to create a quizz, you have to be connect.</p>
                    <p> Click on this icone.</p>
                    <Link to={'/login'}><div className="connexioncouleur"></div></Link>
                    <Menu/>
                </div>
            );
        }
    }

    if (cree === 1){
        return(
            <Redirect to={'/addQuest/'+nomQuizz} />
        );
    }

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

export default AddQuiz;
