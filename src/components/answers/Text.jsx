import React, { useReducer, useState, useEffect } from 'react';

const { addUserTextAnswer } = require('../../services/api.js');

function Text(props){
    const userID = props.userID;
    const questionID = props.questionID;
    const nextQuestionFunction = props.nextQuestionFunction;

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [answers, setAnswers] = useState([]);

    const changeAnswer = (event, index) => {
        const currentAnswers = answers;

        currentAnswers[index] = event.target.value;

        setAnswers(currentAnswers);

        forceUpdate();
    }

    const newAnswer = () => {
        answers.push("");

        forceUpdate();
    }

    const removeAnswer = index => {
        const currentAnswers = answers;
        setAnswers([]);

        currentAnswers.splice(index, 1);
        setAnswers(currentAnswers);

        forceUpdate();
    }

    const sendAnswer = () => {
        const answerPacket = {
            userID: userID,
            questionID: questionID,
            newAnswers: answers
        };

        addUserTextAnswer(answerPacket).then(res => {
            console.log(res);
            // TODO: Proper result handling
            nextQuestionFunction();
        }).catch(error => {
            console.log(error);
            // TODO: Proper error handling
        });
    }

    useEffect(() => {
        answers.push("");

        forceUpdate();
    }, []);

    return(
        <>
            {answers && answers.map((answer, index) => {
                return(
                    <div key={index}>
                        <input
                            type="text"
                            value={answer}
                            placeholder="Your Answer"
                            onChange={event => changeAnswer(event, index)}
                        />
                        <button onClick={() => removeAnswer(index)}>x</button>
                    </div>
                );
            })}

            <button onClick={newAnswer}>+</button>
            <button onClick={sendAnswer}>Submit</button>
        </>
    );
}

export default Text;