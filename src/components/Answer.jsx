import React, { useState, useEffect } from 'react';

const drfToken = "189a4491ca26380a7ace390a2d7c4b7a3ba81fbb";

import { getCookie } from '../services/helpers';

const csrfToken = getCookie('csrftoken');

function AnswerButton(props){
    const sendAnswer = () => {
        const id = props.questionID;
        const answer = props.answerText;

        const packet = {
            username: "testuser",
            questionID: id,
            answer: answer,
        }

        fetch("http://localhost:8000/api/useranswers/add", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(packet),
        });

        props.nextQuestionFunction();
    }

    return(
        <button onClick={sendAnswer}>{props.answerText}</button>
    );
}

export default function Answer(props){
    const [currentAnswers, setCurrentAnswers] = useState([""]);

    useEffect(() => {
        const setData = async() => {
            setCurrentAnswers(props.currentAnswers);
        }

        setData();
    }, [props.currentAnswers]);

    return(
        <>
            {currentAnswers && currentAnswers.map((answer, index) => (
                <div key={index}>
                    <AnswerButton nextQuestionFunction={props.nextQuestionFunction} answerText={answer} questionID={props.currentQuestionID}/>
                </div>
            ))}
        </>
    );
}