import React, { useState, useEffect } from 'react';

import Other from "./Other";

const { getAnswer } = require("../../services/api.js");

function SelectAll(props){    
    const answerID = props.answerID;

    const [questionID, setQuestionID] = useState("");
    const [question, setQuestion] = useState("");
    const [answerText, setAnswerText] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [showOther, setShowOther] = useState(false);

    getAnswer(answerID).then(res => {
        const answer = res.data.answer;

        if(answer == "Other"){
            setIsOther(true);
        }

        setAnswerText(answer);
    });

    const recordAnswer = () => {
        let recordedAnswers = [];
        if(window.sessionStorage.getItem("recordedAnswers"))
        {
            recordedAnswers = JSON.parse(window.sessionStorage.getItem("recordedAnswers"));
        }

        if(recordedAnswers.includes(answerID)){
            recordedAnswers = recordedAnswers.filter(value => {
                return value != answerID;
            });

            setIsSelected(false);
        }
        else{
            recordedAnswers.push(answerID);

            setIsSelected(true);
        }

        window.sessionStorage.setItem("recordedAnswers", JSON.stringify(recordedAnswers));
    };

    useEffect(() => {
        setQuestionID(props.questionID);
        setQuestion(props.question);

        if(window.sessionStorage.getItem("recordedAnswers")){
            const recordedAnswers = JSON.parse(window.sessionStorage.getItem("recordedAnswers"));

            if(recordedAnswers.includes(answerID)){
                setIsSelected(true);
            }
        }
    }, []);

    return(
        <>
            {!isOther
                    ?
                        <>
                            {isSelected
                                ? <button onClick={recordAnswer}>[Selected] {answerText}</button>
                                : <button onClick={recordAnswer}>{answerText}</button>
                            }
                        </>
                    :
                        <button onClick={() => setShowOther(true)}>Other</button>
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

export default SelectAll;