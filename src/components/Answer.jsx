import React, { useEffect } from 'react';

import SelectOne from './answers/SelectOne';
import SelectAll from './answers/SelectAll';
import Slider from './answers/Slider';
import Text from './answers/Text';

function Answer(props){
    const questionType = props.questionType;

    const userID = props.userID;
    const questionID = props.questionID;
    const question = props.question;
    const answerID = props.answerID;
    const nextQuestionFunction = props.nextQuestionFunction;

    return(
        <>
            {questionType == "Select One" &&
                <SelectOne
                    userID={userID}
                    questionID={questionID}
                    question={question}
                    answerID={answerID}
                    nextQuestionFunction={nextQuestionFunction}
                />
            }

            {questionType == "Select All" &&
                <SelectAll
                    answerID={answerID}
                    questionID={questionID}
                    question={question}
                />
            }

            {questionType == "Slider" &&
                <Slider
                    userID={userID}
                    questionID={questionID}
                    answerID={answerID}
                    nextQuestionFunction={nextQuestionFunction}
                />
            }

            {questionType == "Text Input" &&
                <Text
                    userID={userID}
                    questionID={questionID}
                    nextQuestionFunction={nextQuestionFunction}
                />
            }
        </>
    );
}

export default Answer;