import React, { useState, useEffect } from "react";

import Title from "../components/Title";

import Question from "../components/Question";
import Answer from "../components/Answer";

const { getUser, getQuestion } = require("../services/api.js");

function Home(){
    const [currentQuestionID, setCurrentQuestionID] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswers, setCurrentAnswers] = useState("");
    
    function selectQuestion(selectedQuestion){
        if(window.sessionStorage.getItem("userID")){
            const userID = window.sessionStorage.getItem("userID");

            getUser({"userID": userID}).then(res => {
                res.json().then(data => {
                    console.log(data);
                })
            });
            setCurrentQuestion("User ID: " + userID);
        }
        else{
            getQuestion({"questionID": 1}).then(res => {
                res.json().then(data => {
                    console.log(data);

                    setCurrentQuestionID(data.id);
                    setCurrentQuestion(data.question);
                    setCurrentAnswers(data.answers);
                });
            });
        }
    }
    
    function nextQuestion(){
        selectQuestion(currentQuestionID + 1);
    }

    useEffect(() => {
        selectQuestion(1);
    }, [""])

    return(
        <>
            <Title>Shared Traits</Title>
            <Question currentQuestion={currentQuestion}/>
            <Answer nextQuestionFunction={nextQuestion} currentAnswers={currentAnswers} currentQuestionID={currentQuestionID}/>
        </>
    );
}

export default Home;