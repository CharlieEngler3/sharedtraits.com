import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const LogoutPage = lazy(() => import("./pages/Logout"));

function App(){
    return(
        <Router>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/register">Register</Link>
            <br/>
            <Link to="/logout">Logout</Link>
            <br/>
            
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/login" element={<LoginPage/>}/>
                    <Route exact path="/register" element={<RegisterPage/>}/>
                    <Route exact path="/logout" element={<LogoutPage/>}/>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;