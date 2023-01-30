import React, { useReducer, useState, useEffect } from 'react';

const { addQuestionTagSuggestions } = require("../../services/api.js");

function Other(props){
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [questionID, setQuestionID] = useState("");
    const [question, setQuestion] = useState("");
    const [tags, setTags] = useState([]);

    const changeTag = (event, index) => {
        const currentTags = tags;

        currentTags[index] = event.target.value;

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
            // TODO: Add message that says "We'll consider adding those tags in the future"
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
                        <input type="text"
                            value={tag}
                            placeholder="Suggest a tag"
                            onChange={event => changeTag(event, index)}
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