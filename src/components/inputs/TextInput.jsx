import React, { useReducer, useState } from 'react';

export default function TextInput(props){
    const [value, setValue] = useState("");

    function changeValue(event){
        props.callback(event.target.value);
        setValue(event.target.value);
    }

    return(
        <input type="text" value={value} placeholder={props.defaultText} onChange={changeValue}/>
    );
}