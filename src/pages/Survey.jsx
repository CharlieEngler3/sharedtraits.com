import React, { useState, useEffect } from "react";

import Question from "../components/Question";
import Answer from "../components/Answer";
import SubmitAnswer from "../components/SubmitAnswer";

const { getUserQuestionTags, getQuestionsByTag, getUserAnsweredQuestions, getAnswer } = require("../services/api.js");

function Home(){
    const [userID, setUserID] = useState("");

    const [questionQueue, setQuestionQueue] = useState([]);

    const [currentQuestionID, setCurrentQuestionID] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswerIDs, setCurrentAnswerIDs] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [sortingType, setSortingType] = useState("");

    const [requiresSubmit, setRequiresSubmit] = useState(false);
    
    function createQuestionQueue(){
        // TODO: Add local storage authentication based on the time when the userID was added
        if(window.localStorage.getItem("userID")){
            const tempUserID = window.localStorage.getItem("userID");

            getUserQuestionTags(tempUserID).then(res => {
                getQuestionsByTag({ tags: res.data.questionTags }).then(res => {
                    if(res.data){
                        handleQueue(res.data, tempUserID);
                    }
                    else{
                        // TODO: Randomize the questions being asked at this point
                        setCurrentQuestion("No more questions to display");
                    }
                });
            });

            setUserID(tempUserID);
        }
        else{
            setUserID("New User");

            // TODO: Handle proper question tag usage
            getQuestionsByTag({ tags: ["starter-question"] }).then(res => {
                if(res.data){
                    handleQueue(res.data, "New User");
                }
                else{
                    // TODO: Randomize the questions being asked at this point
                    setCurrentQuestion("No more questions to display");
                }
            });
        }
    }

    async function handleQueue(questions, tempUserID){
        const answeredQuestions = tempUserID == "New User" ? [] : (await getUserAnsweredQuestions(tempUserID)).data.answeredQuestions;
        
        questions.forEach(questionData => {
            if(!answeredQuestions.includes(questionData._id)){
                questionQueue.push(questionData);
            }
        });

        if(questionQueue.length > 0)
        {
            setQuestion();
        }
        else
        {
            // TODO: Ask the user to register at this point with the answers they just provided
            setCurrentQuestion("No more questions to display");
        }
        // TODO: Error handling
    }
    
    function nextQuestion(){
        if(questionQueue.length == 0)
        {
            // TODO: Update the current tags in order to produce new questions after the queue has been exhausted
            createQuestionQueue();
        }
        else
        {
            setQuestionQueue(questionQueue[1, questionQueue.length-1]);
            setQuestion();
        }
    }

    const setQuestion = async () => {
        const currentQuestion = questionQueue[0].question;
        const currentQuestionType = questionQueue[0].type;
        const currentSortingType = questionQueue[0].answerSorting;
        const currentAnswerIDs = questionQueue[0].answerIDs;

        setCurrentQuestionID(questionQueue[0]._id);
        setCurrentQuestion(currentQuestion);

        setQuestionType(currentQuestionType);
        setSortingType(currentSortingType);

        // TODO: Handle this better
        if(currentQuestionType == "Select All"){
            setRequiresSubmit(true);
        }

        // TODO: Make sure the other option always comes at the end
        if(currentSortingType == "alphabetical")
        {
            const answers = [];
            for(let i = 0; i < currentAnswerIDs.length; i++)
            {
                // TODO: Error handling
                const currentAnswer = await getAnswer(currentAnswerIDs[i]);
                answers.push(currentAnswer);
            }

            answers.sort((a, b) => a.data.answer.localeCompare(b.data.answer));

            const finalAnswers = [];
            let otherAnswer;
            for(let i = 0; i < answers.length; i++)
            {
                if(answers[i].data.answer != "Other")
                    finalAnswers.push(answers[i])
                else
                    otherAnswer = answers[i];
            }

            if(otherAnswer)
                finalAnswers.push(otherAnswer);

            currentAnswerIDs.length = 0;
            finalAnswers.forEach(answer => {
                currentAnswerIDs.push(answer.data._id);
            });
        }

        setCurrentAnswerIDs(currentAnswerIDs);
    }

    useEffect(() => {
        createQuestionQueue();
    }, [""]);

    return(
        <>
            <Question currentQuestion={currentQuestion}/>

            {currentAnswerIDs && currentAnswerIDs.map((answerID, index) => {
                return(
                    <div key={index}>
                        <Answer
                            userID={userID} 
                            answerID={answerID} 
                            questionID={currentQuestionID} 
                            question={currentQuestion}
                            nextQuestionFunction={nextQuestion}
                            questionType={questionType}
                        />
                    </div>
                );
            })}

            {requiresSubmit &&
                <SubmitAnswer
                    userID={userID}
                    questionID={currentQuestionID}
                    nextQuestionFunction={nextQuestion}
                />
            }
        </>
    );
}

export default Home;