import React from "react";
import axios from "axios";
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useCookies, withCookies} from 'react-cookie';

function FormLogin(props)  {

    return (
        <div className={"log"}>
            <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

            <h2> Sign in</h2>
            <form action="#" onSubmit={props.onSignin}>
                <div className={"infosLog"}>
                    <input type={"text"} id={"username"} ref={props.usernameRef} placeholder={"Username"} name={"name"}/>
                    <input type={"password"} ref={props.passwordRef} placeholder={"Password"} name={"password"}/>
                </div>
                <input type={"submit"} value={"login"} className={"buttonLog"}/>
            </form>
            <p> Not registered ? Click <a href={"./register"} className={"lienLog"}> here </a> to register. </p>
            <nav className="nav"><div className={"ajouter"} />
                <Link to={'/'}><div className="logo_home"/></Link>
                <Link to={'/login'}><div className="login"/></Link>
            </nav>
        </div>

    );
}

function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    function disconnect() {
        removeCookie('login');
    }

    async function onSignup() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signup', user));
            if (p.status === 201) {
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
        return <button id="disconnect" onClick={disconnect}>disconnect</button>;
    }
    return <FormLogin onSignin={onSignin} onSignup={onSignup} usernameRef={usernameRef} passwordRef={passwordRef}/>
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
export default Login;