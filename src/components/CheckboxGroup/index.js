import React from "react";
import Input from "../Input";
import Label from "../Label";

const CheckboxGroup = (props) => {
  const { groupId, labelName, onChange } = props;

  return (
    <div className="checkbox-group">
      <Input
        inputType="checkbox"
        inputName={groupId}
        inputId={groupId}
        onChange={onChange}
      />
      <Label labelId={groupId} labelName={labelName} />
    </div>
  );
};

export default CheckboxGroup;
