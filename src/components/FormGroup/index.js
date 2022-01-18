import React from "react";
import Input from "../Input";
import Label from "../Label";
import Text from "../Text";

const FormGroup = (props) => {
  const { labelName, groupId, handleInput, textClassName, content, inputType } =
    props;

  return (
    <div class="form-group">
      <Label labelId={groupId} labelName={labelName} />
      <Input
        inputId={groupId}
        onInputFunction={handleInput}
        inputType={inputType}
      />
      <Text
        textId={`${groupId}-error-message`}
        className={textClassName}
        content={content}
      />
    </div>
  );
};

export default FormGroup;
