import React from 'react';

const { addUserAnswers } = require("../services/api.js");

function SubmitAnswer(props){
    const userID = props.userID;
    const questionID = props.questionID;

    const nextQuestionFunction = props.nextQuestionFunction;

    const sendRecordedAnswers = () => {
        if(window.sessionStorage.getItem("recordedAnswers")){
            let recordedAnswers = JSON.parse(window.sessionStorage.getItem("recordedAnswers"));

            const answerPacket = {
                userID: userID,
                questionID: questionID,
                answerIDs: recordedAnswers,
            }

            addUserAnswers(answerPacket).then(res => {
                if(res.status == 200){
                    window.sessionStorage.removeItem("recordedAnswers");

                    nextQuestionFunction();
                }
            });
        }
    }

    return (
        <button onClick={sendRecordedAnswers}>SUBMIT</button>
    );
}

export default SubmitAnswer;