import React from "react";
import axios from 'axios';
import {Redirect, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useCookies, withCookies} from 'react-cookie';
import Menu from "./Menu";

function FormRegister(props){
    return (
        <div className={"log"}>
            <div align="center"><img src="images/logo_final.png" alt="img_logo" className="logo"/></div>
            <h2> Register</h2>
            <form action="#" onSubmit={props.onSignup}>
                <div className={"infosLog"}>
                    <input type={"text"} id={"username"} ref={props.usernameRef} placeholder={"Username"} name={"name"}/>
                    <input type={"password"} ref={props.passwordRef} placeholder={"Password"} name={"password"}/>
                    <input type={"password"} ref={props.password2Ref} placeholder={"Confirm password"} name={"confirmpassword"}/>
                    <input type={"hidden"} name={"avatar"} value={"coucou"}/>
                </div>
                <input type={"submit"} value={"create"} className={"buttonLog"}/>
                <p id={"sentencepwd"}> WARNONG : it's not the same password. </p>
            </form>
            <p> Already registered ? Click <a href={"./login"} className={"lienLog"}> here </a> to sign in. </p>
            <Menu/>
        </div>
    );
}

function Register()  {

    const [cookies, setCookie] = useCookies(['login']);
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    async function onSignup(e) {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signup', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function onSignin(e) {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signin', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (cookies.login && cookies.login.username) {
        return (
            <Redirect to='/'/>
        );
    }
    return <FormRegister onSignin={onSignin} onSignup={onSignup} usernameRef={usernameRef} passwordRef={passwordRef}/>
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
export default Register;
