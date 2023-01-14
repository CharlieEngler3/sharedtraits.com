import React, { useEffect, useState } from "react";

const { logoutUser } = require("../services/api.js");

const { redirect } = require("../services/helpers.js");

function Logout(){
    const [message, setMessage] = useState("");

    useEffect(() => {
        logoutUser();
        redirect("");
    }, []);

    return(
        <>
            {message}
        </>
    );
}

export default Logout;