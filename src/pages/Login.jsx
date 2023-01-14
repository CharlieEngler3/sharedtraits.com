import React, { useState } from "react";

import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import SubmitInput from "../components/inputs/SubmitInput";

const { redirect } = require("../services/helpers.js");
const { loginUser } = require("../services/api.js");

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function Login(){
        const user = {
            "email": email,
            "password": password,
        }

        loginUser(user).then(res => {
            // TODO: Maybe check if there are any answers that need to be sent
            window.localStorage.setItem("userID", res.data._id);
            redirect("");
        }).catch(error => {
            // TODO: Better error handling
            console.log(error.message);
        });
    }

    return(
        <>
            <TextInput defaultText="Email" callback={setEmail}/>
            <PasswordInput defaultText="Password" callback={setPassword}/>
            <SubmitInput text="Log In" callback={Login}/>
        </>
    );
}

export default Login;