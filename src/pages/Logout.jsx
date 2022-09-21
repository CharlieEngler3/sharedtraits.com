import React, { useEffect, useState } from "react";

const { logoutUser } = require("../services/api.js");

const { redirect } = require("../services/helpers.js");

function Logout(){
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(window.sessionStorage.getItem("token")){
            logoutUser(window.sessionStorage.getItem("token")).then(res => {
                if(res.status == 204){
                    setMessage("Successfully Logged Out");
                    window.sessionStorage.clear();
                    redirect("");
                }
                else{
                    setMessage("Error Logging Out");
                }
            }); 
        }
    }, []);

    return(
        <>
            {message}
        </>
    );
}

export default Logout;