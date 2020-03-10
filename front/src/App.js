import logo from './logo.svg';
import './App.css';

import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "./Home.js";
import About from "./About.js";
import Login from "./Login.js";
import Quizz from "./Quizz.js";

function App()  {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route exact={true} path="/about" component={About} />
                    <Route exact={true} path="/login" component={Login} />
                    <Route exact={true} path="/quizz/:id" component={Quizz}/>
                    <Route path="*" component={() => <p>Page Not Found</p>} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
