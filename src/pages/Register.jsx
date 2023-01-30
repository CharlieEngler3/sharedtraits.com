import React, { useState } from "react";

const { redirect } = require("../services/helpers.js");
const { registerUser } = require("../services/api.js");

function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    function RegisterUser(){
        let questionTags = [];
        let answeredQuestions = [];
        let answers = [];
        if(window.sessionStorage.getItem("tempAnswers")){
            const tempAnswers = JSON.parse(window.sessionStorage.getItem("tempAnswers"));

            tempAnswers.forEach(answer => {
                answeredQuestions.push(answer.questionID);
            });

            answers = tempAnswers;
        }
        else
        {
            questionTags = ["starter-question"];
        }

        if(password == repeatPassword){
            const user = {
                username: username,
                email: email,
                password: password,
                questionTags: questionTags,
                answeredQuestions: answeredQuestions,
                answers: answers 
            }

            registerUser(user).then(res => {
                const newUser = res.data;
                window.localStorage.setItem("userID", newUser.userID);
                window.localStorage.setItem("email", newUser.email);
                window.localStorage.setItem("username", newUser.username);

                window.sessionStorage.clear();

                redirect("");
            }).catch(error => {
                // TODO: Better error handling
                console.log(error.message);
            });
        }
        else{
            // TODO: Better error handling
            console.error("Passwords do not match.");
        }
    }

    return(
        <>
            <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={event => setUsername(event.target.value)}
            />

            <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
            />

            <input
                type="password"
                placeholder="Repeat Password"
                onChange={event => setRepeatPassword(event.target.value)}
            />

            <button onClick={RegisterUser}>Register</button>
        </>
    );
}

export default Register;