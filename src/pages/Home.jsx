import React, { useState, useEffect } from "react";

import Title from "../components/Title";

import Question from "../components/Question";
import Answer from "../components/Answer";
            
const drfToken = "189a4491ca26380a7ace390a2d7c4b7a3ba81fbb";

function Home(){
    const [currentQuestionID, setCurrentQuestionID] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswers, setCurrentAnswers] = useState("");
    
    const [selectedQuestion, setSelectedQuestion] = useState(1);

    function getQuestion(){
        console.log(selectedQuestion);
        fetch("http://localhost:8000/api/questions/" + selectedQuestion, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": "Token " + drfToken,
            }
        }).then(res => {
            res.json().then(data => {
                setCurrentQuestionID(data.id);
                setCurrentQuestion(data.question);
                setCurrentAnswers(data.answers);
            });
        });
    }
    
    function nextQuestion(){
        const tempSelectedQuestion = selectedQuestion;
        setSelectedQuestion(tempSelectedQuestion + 1);
        getQuestion();
    }

    useEffect(() => {
        getQuestion();
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