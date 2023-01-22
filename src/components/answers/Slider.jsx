import React, { useState, useEffect } from 'react';

const { getAnswer, addUserSliderAnswer } = require("../../services/api.js");

function Slider(props){
    const userID = props.userID;
    const questionID = props.questionID;
    const answerID = props.answerID;
    const nextQuestionFunction = props.nextQuestionFunction;

    const [answerTags, setAnswerTags] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1);
    const [currentValue, setCurrentValue] = useState(0);
    const [units, setUnits] = useState("");
    const [minTagThreshold, setMinTagThreshold] = useState(0);
    const [maxTagThreshold, setMaxTagThreshold] = useState(1);

    const changeValue = event => {
        const newValue = event.target.value;

        setCurrentValue(Number(newValue));
    }

    const sendAnswer = () => {
        const sliderValue = Number(currentValue);

        let tag;
        if(sliderValue < minTagThreshold)
            tag = answerTags[0];
        else if(sliderValue >= minTagThreshold && sliderValue < maxTagThreshold)
            tag = answerTags[1];
        else
            tag = answerTags[2];

        const answerPacket = {
            userID: userID,
            questionID: questionID,
            value: sliderValue,
            tag: tag
        }

        // TODO: Call nextQuestionFunction when the answer is successfully submitted
        addUserSliderAnswer(answerPacket).then(res => {
            // TODO: Proper response handling
            console.log(res);
        }).catch(error => {
            // TODO: Proper error handling
            console.log(error);
        });
    }

    useEffect(() => {
        getAnswer(answerID).then(res => {
            const answer = JSON.parse(res.data.answer);
            const min = answer[0];
            const max = answer[1];
            const minThreshold = answer[2];
            const maxThreshold = answer[3];

            setAnswerTags(res.data.tags);

            setMinValue(min);
            setMaxValue(max);
            setCurrentValue(min + (max - min) / 2);
            setUnits(answer[4]);

            setMinTagThreshold(minThreshold);
            setMaxTagThreshold(maxThreshold);
        });
        // TODO: Error handling
    }, []);

    return(
        <>
            <p>{currentValue.toString()} {units}</p>

            <input
                type="range"
                onChange={event => changeValue(event)}
                min={minValue.toString()}
                max={maxValue.toString()}
                value={currentValue.toString()}
            />
        
            <button onClick={sendAnswer}>SUBMIT</button>
        </>
    );
}

export default Slider;