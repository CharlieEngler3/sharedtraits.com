import React from 'react';

export default function PasswordInput(props){
    function changeValue(event){
        props.callback(event.target.value);
    }

    return(
        <input type="password" placeholder={props.defaultText} onChange={changeValue}/>
    );
}