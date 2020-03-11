import logo from './logo.svg';
import './App.css';

import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "./Home.js";
import About from "./About.js";
import Login, {ProtectedRoute} from "./Login.js";
import Register from "./Register.js";
import Quizz from "./Quizz.js";
import addQuest from "./addQuestion.js";
import AddQuiz from "./addQuizz.js";
import Profil from "./Profil";

function App()  {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route exact={true} path="/about" component={About} />
                    <Route exact={true} path="/login" component={Login} />
                    <Route exact={true} path="/register" component={Register} />
                    <Route exact={true} path="/quizz/:id" component={Quizz}/>
                    <Route exact={true} path="/profil" component={Profil}/>
                    <Route exact={true} path="/addQuiz" component={AddQuiz} />
                    <Route exact={true} path="/addQuest" component={addQuest} />
                    <Route path="*" component={() => <p>Page Not Found</p>} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
