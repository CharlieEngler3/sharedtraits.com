import React, { useState, useEffect } from 'react';

const { getAnswer } = require("../../services/api.js");

function SelectAll(props){    
    const answerID = props.answerID;

    const [answerText, setAnswerText] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    // TODO: Check if this works
    getAnswer(answerID).then(res => {
        setAnswerText(res.data.answer);
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
        if(window.sessionStorage.getItem("recordedAnswers")){
            const recordedAnswers = JSON.parse(window.sessionStorage.getItem("recordedAnswers"));

            if(recordedAnswers.includes(answerID)){
                setIsSelected(true);
            }
        }
    }, []);

    return(
        <>
            {isSelected
                ? <button onClick={recordAnswer}>[Selected] {answerText}</button>
                : <button onClick={recordAnswer}>{answerText}</button>
            }
        </>
    );
}

export default SelectAll;