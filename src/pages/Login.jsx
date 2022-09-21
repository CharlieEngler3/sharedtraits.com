import React, { useState } from "react";

import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import SubmitInput from "../components/inputs/SubmitInput";

const { getCookie, redirect } = require("../services/helpers.js");

const csrfToken = getCookie('csrftoken');

function Login(){
    const [identifyingCredential, setIdentifyingCredential] = useState("");
    const [password, setPassword] = useState("");

    function Login(){
        let email, username = null;
        if(identifyingCredential.includes("@")){
            email = identifyingCredential;
       }
        else{
            username = identifyingCredential;
       }

        const user = {
            "username": username,
            "email": email,
            "password": password,
        }

        fetch("http://localhost:8000/api/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(user),
        }).then(res => {
            res.json().then(data => {
                window.sessionStorage.setItem("token", data.token);
                window.sessionStorage.setItem("userID", data.userID);

                redirect("");
            });
        });
    }

    return(
        <>
            <TextInput defaultText="Username or Email" callback={setIdentifyingCredential}/>
            <PasswordInput defaultText="Password" callback={setPassword}/>
            <SubmitInput text="Log In" callback={Login}/>
        </>
    );
}

export default Login;