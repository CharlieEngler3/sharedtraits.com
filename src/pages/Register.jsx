import React, { useState } from "react";

import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import SubmitInput from "../components/inputs/SubmitInput";

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
            <TextInput defaultText="Username" callback={setUsername}/>
            <TextInput defaultText="Email" callback={setEmail}/>
            <PasswordInput defaultText="Password" callback={setPassword}/>
            <PasswordInput defaultText="Repeat Password" callback={setRepeatPassword}/>
            <SubmitInput text="Register" callback={RegisterUser}/>
        </>
    );
}

export default Register;