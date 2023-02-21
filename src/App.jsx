import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App-Dark.css";

const SurveyPage = lazy(() => import("./pages/Survey"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const LogoutPage = lazy(() => import("./pages/Logout"));
const AccountPage = lazy(() => import("./pages/Account"));

// TODO: Delete me for release
const AddQuestionOrAnswer = lazy(() => import("./pages/AddQuestionOrAnswer"));
// TODO: Delete me for release
const EditQuestionOrAnswer = lazy(() => import("./pages/EditQuestionOrAnswer"));

function App(){
    return(
        <body>
            <Router>
                <div className="navbar">
                    <Link className="home-nav-link" style={{float: "left"}} to="/">Shared Traits</Link>
                    <Link className="nav-link" style={{float: "left"}} to="/addquestionoranswer">+</Link>
                    <Link className="nav-link" style={{float: "left"}} to="/editquestionoranswer">✎</Link>

                    {window.localStorage.getItem("userID") ?
                        <>
                            <Link className="nav-link" style={{float: "right"}} to="/account">👤</Link>
                            <Link className="nav-link" style={{float: "right"}} to="/logout">⤴</Link>
                        </>
                    :
                        <>
                            <Link className="nav-link" style={{float: "right"}} to="/login">⤷</Link>
                            <Link className="nav-link" style={{float: "right"}} to="/register">📝</Link>
                        </>
                    }
                </div>
                
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route exact path="/" element={<SurveyPage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/register" element={<RegisterPage/>}/>
                        <Route exact path="/logout" element={<LogoutPage/>}/>
                        <Route exact path="/account" element={<AccountPage/>}/>

                        <Route exact path="/addquestionoranswer" element={<AddQuestionOrAnswer/>}/>
                        <Route exact path="/editquestionoranswer" element={<EditQuestionOrAnswer/>}/>
                    </Routes>
                </Suspense>
            </Router>
        </body>
    );
}

export default App;