import React, {useEffect, useState} from "react";
import UserThumbnail from "./UserThumbnail";
import axios from 'axios';

function Register()  {
    const [users, setUsers] = useState([]);

    async function getUsers(){
        const data = (await axios.get('http://localhost:8000/users')).data;
        setUsers(data);
    }

    async function addUser(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/users', {
            name : e.target.elements[0].value,
            password : e.target.elements[1].value,
            avatar : e.target.elements[2].value
        }).then(res => {
            getUsers()
        })
    }

    useEffect(() => {
        getUsers()
    }, []);

    let jsxUsers = users
        .map(p =>
            <UserThumbnail
                name={p.name}
                password={p.password}
                avatar={p.avatar}/>);

    return (
        <div className={"log"}>
            <h2> Register</h2>
            <form action="#" onSubmit={e => addUser(e)}>
                <div className={"infosLog"}>
                    <input type={"text"} placeholder={"Username"} name={"name"}/>
                    <input type={"password"} placeholder={"Password"} name={"password"}/>
                    <input type={"password"} placeholder={"Confirm password"} name={"confirmpassword"}/>
                </div>
                <input type={"submit"} value={"create account"} className={"buttonLog"}/>
            </form>
            <p> Already registered ? Click <a href={"./login"} className={"lienLog"}> here </a> to sign in. </p>
            {jsxUsers}
        </div>

    );
}

export default Register;
