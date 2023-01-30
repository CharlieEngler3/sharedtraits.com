import React, { useState } from "react";

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

            <button onClick={Login}>Log In</button>
        </>
    );
}

export default Login;