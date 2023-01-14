import React, { useReducer, useState } from 'react';

const { getQuestionByQuestion, getAnswer, updateQuestion, deleteQuestionAndAnswers } = require("../services/api.js");

function EditQuestionOrAnswer(){
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [questionSearchText, setQuestionSearchText] = useState("");

    const [questionID, setQuestionID] = useState("");
    const [question, setQuestion] = useState("");
    const [answerIDs, setAnswerIDs] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answerTags, setAnswerTags] = useState([[]]);
    const [questionTags, setQuestionTags] = useState([]);
    const [answerSorting, setAnswerSorting] = useState("");
    const [questionType, setQuestionType] = useState("");

    const searchByQuestion = () => {
        getQuestionByQuestion(questionSearchText).then(async res => {
            setQuestionID(res.data._id);
            setQuestion(res.data.question);
            setQuestionTags(res.data.tags);
            setAnswerSorting(res.data.answerSorting);
            setQuestionType(res.data.type);

            const answerIDs = res.data.answerIDs;
            const currentAnswers = [];
            const currentAnswerTags = [];

            for(let i = 0; i < answerIDs.length; i++){
                const answerData = await getAnswer(answerIDs[i]);
                
                currentAnswers.push(answerData.data.answer);
                currentAnswerTags.push(answerData.data.tags);
            }

            setAnswerIDs(answerIDs);
            setAnswers(currentAnswers);
            setAnswerTags(currentAnswerTags);
        });
    }

    const addQuestionTag = () => {
        const currentQuestionTags = questionTags;

        currentQuestionTags.push([]);

        setQuestionTags(currentQuestionTags);

        forceUpdate();
    }

    const changeQuestionTag = (event, index) => {
        const newTag = event.target.value;
        const currentQuestionTags = questionTags;

        currentQuestionTags[index] = newTag;

        setQuestionTags(currentQuestionTags);

        forceUpdate();
    }

    const addAnswer = () => {
        const currentAnswers = answers;

        currentAnswers.push([]);

        setAnswers(currentAnswers);

        forceUpdate();
    }

    const changeAnswer = (event, index) => {
        const newAnswer = event.target.value;
        const currentAnswers = answers;

        currentAnswers[index] = newAnswer;

        setAnswers(currentAnswers);

        forceUpdate();
    }

    const addAnswerTag = answerIndex => {
        const currentAnswerTags = answerTags;

        for(let i = currentAnswerTags.length - 1; i < answerIndex + 1; i++){
            currentAnswerTags.push([]);
        }

        currentAnswerTags[answerIndex].push([]);

        setAnswerTags(currentAnswerTags);

        forceUpdate();
    }

    const changeAnswerTag = (event, answerIndex, tagIndex) => {
        const newAnswerTag = event.target.value;
        const currentAnswerTags = answerTags;

        (currentAnswerTags[answerIndex])[tagIndex] = newAnswerTag;

        setAnswerTags(currentAnswerTags);

        forceUpdate();
    }

    const submitQuestion = () => {
        const questionUpdatePacket = {
            questionID: questionID,
            question: question,
            answerIDs: answerIDs,
            answers: answers,
            answerTags: answerTags,
            questionTags: questionTags,
            answerSorting: answerSorting,
            questionType: questionType
        }

        console.log(questionUpdatePacket);
        updateQuestion(questionUpdatePacket).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }
    
    const removeQuestion = () => {
        deleteQuestionAndAnswers(questionID).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return(
        <>
            <br/>
            {!question
                ?
                    <>
                        <input type="text" placeholder="Search by question" onChange={event => setQuestionSearchText(event.target.value)}/>
                        <br/>
                        <button onClick={searchByQuestion}>Search By Question</button>           
                    </>
                :
                    <>
                        <p>Question ID: {questionID}</p>
                        <br/>
                        <input type="text" placeholder="Question" style={{width: "100%"}} value={question} onChange={event => setQuestion(event.target.value)}/>
                        <br/>
                        <input type="text" placeholder="Answer Sorting" value={answerSorting} onChange={event => setAnswerSorting(event.target.value)}/>
                        <input type="text" placeholder="Question Type" value={questionType} onChange={event => setQuestionType(event.target.value)}/>
                        <br/>
                        <p>Question Tags:</p>
                        {questionTags && questionTags.map((questionTag, index) => {
                            return(
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Question Tag"
                                        style={{marginLeft: "40px"}}
                                        value={questionTag}
                                        onChange={event => changeQuestionTag(event, index)}
                                    />
                                </div>
                            );
                        })}
                        <button onClick={addQuestionTag}>Add Question Tag</button>
                        <br/>
                        <p>Answers:</p>
                        {answers && answerTags && answers.map((answer, answerIndex) => {
                            return(
                                <div key={answerIndex}>
                                    <input
                                        type="text"
                                        placeholder="Answer"
                                        style={{marginLeft: "40px"}}
                                        value={answer}
                                        onChange={event => changeAnswer(event, answerIndex)}
                                    />

                                    {answerTags[answerIndex] && answerTags[answerIndex].map((answerTag, tagIndex) => {
                                        return(
                                            <div key={tagIndex} style={{display: "inline-block"}}>
                                                <input
                                                    type="text"
                                                    placeholder="Answer Tag"
                                                    value={answerTag}
                                                    onChange={event => changeAnswerTag(event, answerIndex, tagIndex)}
                                                />
                                            </div>
                                        );
                                    })}
                                    <button onClick={() => addAnswerTag(answerIndex)}>+</button>
                                </div>
                            );
                        })}
                        <button onClick={addAnswer}>Add Answer</button>
                        <br/>
                        <br/>
                        <button onClick={submitQuestion}>Update Question</button>
                        <br/>
                        <br/>
                        <button onClick={removeQuestion}>Delete Question and Answers</button>
                    </>
            }
        </>
    );
}

export default EditQuestionOrAnswer;