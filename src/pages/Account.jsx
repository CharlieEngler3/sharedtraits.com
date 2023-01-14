import React, { useEffect, useState } from "react";

const { redirect } = require("../services/helpers");
const { getUser, deleteUser } = require("../services/api");

function Account(){
    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [answers, setAnswers] = useState([]);
    const [questionTags, setQuestionTags] = useState([]);

    function deleteAccount(){ 
        deleteUser(userID).then(res => {
            if(res.status == 200){
                downloadUser();
                redirect("");
            }
        }).catch(error => {
            // TODO: Proper error handling
            console.log(error.message);
        });
    }

    function downloadUser(){
        const user = {
            email: email,
            username: username,
            answers: answers,
            questionTags: questionTags
        }

        const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user));
        const downloadElement = document.createElement('a');
        downloadElement.setAttribute("href", data);
        downloadElement.setAttribute("download", "data.json");
        document.body.appendChild(downloadElement);

        downloadElement.click();
        downloadElement.remove();
    }

    useEffect(() => {
        if(window.localStorage.getItem("userID")){
            const userID = window.localStorage.getItem("userID");

            setUserID(userID);

            getUser(userID).then(res => {
                const user = res.data;

                setUsername(user.username);
                setEmail(user.email);
                setAnswers(user.answers);
                setQuestionTags(user.questionTags);
            }).catch(error => {
                // TODO: Proper error handling
                console.log(error.message);
            });
        }
        else{
            redirect("");
        }
    }, []);

    return(
        <>
            {username && <p>{username}</p>}

            {email && <p>{email}</p>}

            <p>Answers:</p>
            {answers && answers.map((answer, index) => {
                return(
                    <div key={index}>
                        <p style={{marginLeft: "40px"}}>{answer}</p>
                    </div> 
                );
            })}

            <p>Question Tags:</p>
            {questionTags && questionTags.map((tag, index) => {
                return(
                    <div key={index}>
                        <p style={{marginLeft: "40px"}}>{tag}</p>
                    </div>
                );
            })}

            <button onClick={() => redirect("logout")}>Logout</button>
            <br/>
            <button onClick={deleteAccount}>Delete Account</button>
        </>
    );
}

export default Account;