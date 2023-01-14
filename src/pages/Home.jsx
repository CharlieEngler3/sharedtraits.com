import React, { useState, useEffect } from "react";

import Title from "../components/Title";

import Question from "../components/Question";
import Answer from "../components/Answer";
import SubmitAnswer from "../components/SubmitAnswer";

const { getUserQuestionTags, getQuestionsByTag, getUserAnsweredQuestions } = require("../services/api.js");

function Home(){
    const [userID, setUserID] = useState("");

    const [questionQueue, setQuestionQueue] = useState([]);

    const [currentQuestionID, setCurrentQuestionID] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswerIDs, setCurrentAnswerIDs] = useState("");
    const [questionType, setQuestionType] = useState("");

    const [requiresSubmit, setRequiresSubmit] = useState(false);
    
    function createQuestionQueue(){
        // TODO: Add local storage authentication based on the time when the userID was added
        if(window.localStorage.getItem("userID")){
            const tempUserID = window.localStorage.getItem("userID");

            getUserQuestionTags(tempUserID).then(res => {
                getQuestionsByTag({ tags: res.data.questionTags }).then(res => {
                    if(res.data[0]){
                        handleQueue(res.data[0], tempUserID);
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
                if(res.data[0]){
                    handleQueue(res.data[0], "New User");
                }
                else{
                    // TODO: Randomize the questions being asked at this point
                    setCurrentQuestion("No more questions to display");
                }
            });
        }
    }

    async function handleQueue(questions, tempUserID){
        const answeredQuestions = (await getUserAnsweredQuestions(tempUserID)).data.answeredQuestions;
        
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

    function setQuestion(){
        const currentQuestion = questionQueue[0].question;
        const currentQuestionType = questionQueue[0].type;

        setCurrentQuestionID(questionQueue[0]._id);
        setCurrentQuestion(currentQuestion);

        // TODO: Sort answer IDs by the question's answerSorting field
        setCurrentAnswerIDs(questionQueue[0].answerIDs);

        setQuestionType(currentQuestionType);

        if(currentQuestionType == "Select All"){
            setRequiresSubmit(true);
        }
    }

    useEffect(() => {
        createQuestionQueue();
    }, [""]);

    return(
        <>
            <Title>Shared Traits</Title>
            <Question currentQuestion={currentQuestion}/>

            {currentAnswerIDs && currentAnswerIDs.map((answerID, index) => {
                return(
                    <div key={index}>
                        <Answer
                            userID={userID} 
                            answerID={answerID} 
                            questionID={currentQuestionID} 
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