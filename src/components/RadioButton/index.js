import React from 'react'
import Input from '../Input';
import Label from "../Label";

const RadioButton = (props) => {
  const { labelName, groupId, value, inputName, onChange } = props;

  return (
    <>
      <Input
        inputType="radio"
        inputName={inputName}
        value={value}
        onChange={onChange}
        inputId={groupId}
      />
      <Label labelId={groupId} labelName={labelName} onChange={onChange} />
    </>
  );
}

export default RadioButton
