import React, { useState, useEffect } from 'react';

import SelectOne from './answers/SelectOne';
import SelectAll from './answers/SelectAll';

function Answer(props){
    const questionType = props.questionType;

    const userID = props.userID;
    const questionID = props.questionID;
    const answerID = props.answerID;
    const nextQuestionFunction = props.nextQuestionFunction;

    return(
        <>
            {questionType == "Select One" &&
                <SelectOne
                    userID={userID}
                    questionID={questionID}
                    answerID={answerID}
                    nextQuestionFunction={nextQuestionFunction}
                />
            }

            {questionType == "Select All" &&
                <SelectAll
                    answerID={answerID}
                />
            }
        </>
    );
}

export default Answer;