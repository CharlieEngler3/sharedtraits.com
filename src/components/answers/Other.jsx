import React, { useReducer, useState, useEffect } from 'react';

import TextInput from "../inputs/TextInput";

const { addQuestionTagSuggestions } = require("../../services/api.js");

function Other(props){
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [questionID, setQuestionID] = useState("");
    const [question, setQuestion] = useState("");
    const [tags, setTags] = useState([]);

    const changeTag = (tagText, index) => {
        const currentTags = tags;

        currentTags[index] = tagText;

        setTags(currentTags);
    }

    const newTag = () => {
        tags.push("");

        forceUpdate();
    }

    const submitTagSuggestions = () => {
        const suggestionPacket = {
            questionID: questionID,
            question: question,
            tags: tags
        }

        addQuestionTagSuggestions(suggestionPacket).then(res => {
            // TODO: Proper response handling
            console.log(res);
        }).catch(error => {
            // TODO: Proper error handling
            console.log(error);
        });
    }

    useEffect(() => {
        tags.push("");
        setQuestionID(props.questionID);
        setQuestion(props.question);

        forceUpdate();
    }, []);

    return(
        <>
            {tags && tags.map((tag, index) => {
                return(
                    <div key={index}>
                        <TextInput
                            defaultText="Suggest a tag"
                            callback={tagText => changeTag(tagText, index)}
                        />
                    </div>
                );
            })}
            <button onClick={newTag}>+</button>
            <button onClick={submitTagSuggestions}>Submit Tag Suggestions</button>
        </>
    );
}

export default Other;