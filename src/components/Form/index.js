import React from 'react'
import { useState, useEffect } from 'react';

const InputText = (props) => {
  const { inputId, onInputFunction } = props; 

  return (
    <input id={inputId} type="text" onInput={onInputFunction}>
      
    </input>
  )
}

const InputPassword = (props) => {
  const { inputId, onInputFunction } = props; 

  return (
    <input id={inputId} type="password" onInput={onInputFunction}>
      
    </input>
  )
}

const ButtonSubmit = (props) => {
  const { buttonName } = props

  return (
    <button type="submit">
      {buttonName}
    </button>
  )
}

const Label = (props) => {
  const { labelName } = props;
  return(
    <label for={labelName}></label>
  )
}

const Span = (props) => {
  return (
    <span >
      
    </span>
  )
}


export default { InputText, InputPassword, ButtonSubmit, Label, Span }
