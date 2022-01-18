import React from 'react'
import { useState, useEffect } from 'react';

const Input = (props) => {
  const { inputClassName, inputType, onInputFunction } = props; 

  return (
    <input className="inputClassName" type="" onInput={onInputFunction}>
      
    </input>
  )
}
const Label = (props) => {
  const { labelName } = props;
  return(
    <label for=''></label>
  )
}

export default { Input, Label }
