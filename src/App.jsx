import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));

function App(){
    return(
        <Router>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/login">Login</Link>
            
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/login" element={<LoginPage/>}/>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;