import React from 'react';

export default function SubmitInput(props){
    return(
        <button onClick={props.callback}>{props.text}</button>
    );
}