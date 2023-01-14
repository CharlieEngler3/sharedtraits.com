import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));
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
        <Router>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/addquestionoranswer">Question and Answer Adder</Link>
            <br/>
            <Link to="/editquestionoranswer">Question and Answer Editor</Link>

            {window.localStorage.getItem("userID") ?
                <>
                    <br/>
                    <Link to="/account">Account</Link>
                    <br/>
                    <Link to="/logout">Logout</Link>
                </>
            :
                <>
                    <br/>
                    <Link to="/login">Login</Link>
                    <br/>
                    <Link to="/register">Register</Link>
                </>
            }
            <br/>
            
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/login" element={<LoginPage/>}/>
                    <Route exact path="/register" element={<RegisterPage/>}/>
                    <Route exact path="/logout" element={<LogoutPage/>}/>
                    <Route exact path="/account" element={<AccountPage/>}/>

                    <Route exact path="/addquestionoranswer" element={<AddQuestionOrAnswer/>}/>
                    <Route exact path="/editquestionoranswer" element={<EditQuestionOrAnswer/>}/>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;