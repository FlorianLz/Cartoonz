import React, {useEffect, useState} from "react";
import UserThumbnail from "./UserThumbnail";
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

function Register()  {
    const [users, setUsers] = useState([]);
    const [page,setPage]=useState(0);

    async function getUsers(){
        const data = (await axios.get('http://localhost:8000/users')).data;
        setUsers(data);
    }

    async function addUser(e) {
        e.preventDefault();
        await axios.post('http://localhost:8000/users', {
            username : e.target.elements[0].value,
            password : e.target.elements[1].value,
            passwordconfirm : e.target.elements[2].value,
            avatar : e.target.elements[3].value
        });
        setPage(1);
    }

    useEffect(() => {
        getUsers()
    }, []);

    let jsxUsers = users
        .map(p =>
            <UserThumbnail
                name={p.username}
                password={p.password}
                avatar={p.avatar}/>);

    if(page==1) return <Redirect to="/"/>

    return (
        <div className={"log"}>
            <h2> Register</h2>
            <form action="#" onSubmit={e => addUser(e)}>
                <div className={"infosLog"}>
                    <input type={"text"} placeholder={"Username"} name={"username"}/>
                    <input type={"password"} placeholder={"Password"} name={"password"}/>
                    <input type={"password"} placeholder={"Confirm password"} name={"confirmpassword"}/>
                    <input type={"hidden"} name={"avatar"} value={"coucou"}/>
                </div>
                <input type={"submit"} value={"create"} className={"buttonLog"}/>
                <p id={"sentencepwd"}> WARNONG : it's not the same password. </p>
            </form>
            <p> Already registered ? Click <a href={"./login"} className={"lienLog"}> here </a> to sign in. </p>
            {jsxUsers}
            <nav className="nav"><div className="ajouter"></div>
                <Link to={'/'}><div className="logo_home"></div></Link>
                <Link to={'/login'}><div className="login"></div></Link>
            </nav>
        </div>
    );
}

export default Register;
