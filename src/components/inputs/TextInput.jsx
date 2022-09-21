import React from 'react';

export default function TextInput(props){
    function changeValue(event){
        props.callback(event.target.value);
    }

    return(
        <input type="text" placeholder={props.defaultText} onChange={changeValue}/>
    );
}