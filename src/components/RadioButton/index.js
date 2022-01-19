import React from 'react'
import Input from '../Input';
import Label from "../Label";

const RadioButton = (props) => {
  const { labelName, groupId, value, checked } = props;

  return (
    <>
      <Input
        inputType="radio"
        inputName={groupId}
        value={value}
        checked={checked}
      />
      <Label labelId={groupId} labelName={labelName} />
    </>
  );
}

export default RadioButton
