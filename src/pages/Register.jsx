import React, { useState } from "react";

import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import SubmitInput from "../components/inputs/SubmitInput";

const { getCookie, redirect } = require("../services/helpers.js");

const csrfToken = getCookie('csrftoken');

const apiURL = "http://localhost:8000/api/";

function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    function Register(){
        if(password == repeatPassword){
            const user = {
                "username": username,
                "email": email,
                "password": password,
                "tags": {},
            }

            fetch(apiURL + "register", {
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
        else{
            console.error("Passwords do not match.");
        }
    }

    return(
        <>
            <TextInput defaultText="Username" callback={setUsername}/>
            <TextInput defaultText="Email" callback={setEmail}/>
            <PasswordInput defaultText="Password" callback={setPassword}/>
            <PasswordInput defaultText="Repeat Password" callback={setRepeatPassword}/>
            <SubmitInput text="Register" callback={Register}/>
        </>
    );
}

export default Register;