import React, { useReducer, useState } from 'react';

const { addQuestion } = require("../services/api.js");

function AddQuestionOrAnswer(){
    const [question, setQuestion] = useState("");
    const [answerSorting, setAnswerSorting] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [questionTags, setQuestionTags] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answerTags, setAnswerTags] = useState([[]]);

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [answerInputs, setAnswerInputs] = useState([]);
    const [answerInputSize, setAnswerInputSize] = useState(0);

    const [answerTagInputs, setAnswerTagInputs] = useState([[]]);
    const [answerTagInputSizes, setAnswerTagInputSizes] = useState([]);

    const [questionTagInputs, setQuestionTagInputs] = useState([]);
    const [questionTagInputSize, setQuestionTagInputSize] = useState(0);

    const changeAnswer = (event, answerInputIndex) => {
        const currentAnswers = answers;
        const answerValue = event.target.value;

        currentAnswers[answerInputIndex] = answerValue;

        setAnswers(currentAnswers);
    }

    const changeAnswerTag = (event, answerInputIndex, answerTagIndex) => {
        const currentAnswerTags = answerTags;
        const answerTagValue = event.target.value;

        if(!currentAnswerTags[answerInputIndex]){
            for(let i = 0; i < answerInputIndex + 1; i++){
                currentAnswerTags.push([]);
            }
        }

        (currentAnswerTags[answerInputIndex])[answerTagIndex] = answerTagValue;

        setAnswerTags(currentAnswerTags);
    }

    const changeQuestionTag = (event, questionTagInputIndex) => {
        const currentQuestionTags = questionTags;
        const questionTagValue = event.target.value;

        currentQuestionTags[questionTagInputIndex] = questionTagValue;

        setQuestionTags(currentQuestionTags);
    }

    const newAnswerInput = () => {
        const currentAnswerInputs = answerInputs;
        const answerInputIndex = answerInputSize;

        currentAnswerInputs.push(<input type="text" placeholder="Answer" onChange={event => changeAnswer(event, answerInputIndex)}/>);

        setAnswerInputs(currentAnswerInputs);
        setAnswerInputSize(answerInputSize + 1);

        forceUpdate();
    }

    const newAnswerTagInput = (answerInputIndex) => {
        const currentAnswerTagInputs = answerTagInputs;
        const currentAnswerTagInputSizes = answerTagInputSizes;
        const answerTagInputIndex = answerTagInputSizes[answerInputIndex] != null ? answerTagInputSizes[answerInputIndex] : 0;

        if(!currentAnswerTagInputs[answerInputIndex]){
            for(let i = 0; i < answerInputIndex + 1; i++){
                currentAnswerTagInputs.push([]);
            }
        }

        currentAnswerTagInputs[answerInputIndex].push(<input type="text" placeholder="Answer Tag" onChange={event => changeAnswerTag(event, answerInputIndex, answerTagInputIndex)}/>);

        setAnswerTagInputs(currentAnswerTagInputs);

        currentAnswerTagInputSizes[answerInputIndex] = answerTagInputIndex + 1;
        setAnswerTagInputSizes(currentAnswerTagInputSizes);

        forceUpdate();
    }

    const newQuestionTagInput = () => {
        const currentQuestionTagInputs = questionTagInputs;
        const questionTagInputIndex = questionTagInputSize;

        currentQuestionTagInputs.push(<input type="text" placeholder="Question Tag" onChange={event => changeQuestionTag(event, questionTagInputIndex)}/>);

        setQuestionTagInputs(currentQuestionTagInputs);
        setQuestionTagInputSize(questionTagInputSize + 1);

        forceUpdate();
    }

    const sendQuestionData = () => {
        const newQuestionPacket = {
            question: question,
            answerSorting: answerSorting,
            questionType: questionType,
            questionTags: questionTags,
            answers: answers,
            answerTags: answerTags
        }

        console.log(newQuestionPacket);
        addQuestion(newQuestionPacket).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return(
        <>
            <p>Question and Answer Adder</p>

            <input type="text" placeholder="Question" style={{width: "100%"}} onChange={event => setQuestion(event.target.value)}/>
            <br/>
            <input type="text" placeholder="Answer Sorting" onChange={event => setAnswerSorting(event.target.value)}/>
            <input type="text" placeholder="Question Type" onChange={event => setQuestionType(event.target.value)}/>

            <p>Question Tags:</p>
            {questionTagInputs && questionTagInputs.map((questionTagInput, index) => {
                return(
                    <div key={index}>{questionTagInput}</div>
                );
            })}
            <button onClick={newQuestionTagInput}>Add Question Tag</button>

            <p>Answers:</p>
            {answerInputs && answerInputs.map((answerInput, index) => {
                return(
                    <div key={index}>
                        {answerInput}

                        {answerTagInputs && answerTagInputs[index] && answerTagInputs[index].map((answerTagInput, index) => {
                            return(
                                <div key={index} style={{display: "inline-block"}}>
                                    {answerTagInput}
                                </div>
                            );
                        })}

                        <button onClick={() => newAnswerTagInput(index)}>+</button>
                    </div>
                );
            })}
            <br/>

            <button onClick={newAnswerInput}>Add Answer</button>

            <br/>
            <br/>
            <button onClick={sendQuestionData}>Submit Question</button>
        </>
    );
}

export default AddQuestionOrAnswer;