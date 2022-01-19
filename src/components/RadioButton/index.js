import React from 'react'
import Input from '../Input';
import Label from "../Label";

const RadioButton = (props) => {
  const {
    labelName,
    groupId,
    value,

  } = props

  return (
    <div className="radio-button">
      <Input
        inputId={groupId}
        inputType="radio"
        inputName={groupId}
        value={value}
      />
      <Label labelId={groupId} labelName={labelName}/>
    </div>
  )
}

export default RadioButton
