import React, { useState } from 'react';

const { getAnswer, addUserAnswers } = require("../../services/api.js");

function SelectOne(props){    
    const userID = props.userID;
    const questionID = props.questionID;
    const answerID = props.answerID;
    const nextQuestionFunction = props.nextQuestionFunction;

    const [answerText, setAnswerText] = useState("");

    // TODO: Check if this works
    getAnswer(answerID).then(res => {
        setAnswerText(res.data.answer);
    });

    const sendAnswer = () => {
        const answerPacket = {
            userID: userID,
            questionID: questionID,
            answerIDs: [ answerID ],
        };

        addUserAnswers(answerPacket).then(res => {
            if(res.status == 200){
                nextQuestionFunction();
            }
        });
        // TODO: Error handling
    };

    return(
        <button onClick={sendAnswer}>{answerText}</button>
    );
}

export default SelectOne;