import React, { useState, useEffect } from 'react';

import Other from './Other';

const { getAnswer, addUserSelectAnswer } = require("../../services/api.js");

function SelectOne(props){    
    const userID = props.userID;
    const questionID = props.questionID;
    const question = props.question;
    const answerID = props.answerID;
    const nextQuestionFunction = props.nextQuestionFunction;

    const [answerText, setAnswerText] = useState("");
    const [isOther, setIsOther] = useState(false);
    const [showOther, setShowOther] = useState(false);

    const sendAnswer = () => {
        const answerPacket = {
            userID: userID,
            questionID: questionID,
            answerIDs: [ answerID ],
        };

        addUserSelectAnswer(answerPacket).then(res => {
            if(res.status == 200){
                nextQuestionFunction();
            }
        });
        // TODO: Error handling
    };

    useEffect(() => {
        getAnswer(answerID).then(res => {
            const answer = res.data.answer;
            
            if(answer == "Other")
                setIsOther(true);

            setAnswerText(answer);
        });
        // TODO: Error handling
    }, []);

    return(
        <>
            {!isOther
                ? <button onClick={sendAnswer}>{answerText}</button>
                : <button onClick={() => setShowOther(true)}>Other</button>
            }

            {showOther &&
                <Other
                    questionID={questionID}
                    question={question}
                />
            }
        </>
    );
}

export default SelectOne;