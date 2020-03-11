import React from "react";
import {Link, Route} from "react-router-dom";
import {useCookies, withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

function Profil(){
    const [cookies, removeCookie] = useCookies(['login']);

    function disconnect() {
        removeCookie('login');
    }

    if (cookies.login && cookies.login.username){
        return(
            <div>
                <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                <nav className="nav">
                    <div className="trophee"></div>
                    <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
                    <Link to={'/'}><div className="logo_home2"></div></Link>
                    <Link to={'/profil'}><div className="profil"></div></Link>
                    <div className="deconnexion" id="disconnect" onClick={disconnect}></div>
                </nav>
            </div>
        );
    } else {
        return(
            <Redirect to='/'/>
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

export default Profil;