import React from "react";
import Input from "../Input";
import Label from "../Label";

const CheckboxGroup = (props) => {
  const { groupId, labelName } = props;

  return (
    <div class="checkbox-group">
      <Input inputType="checkbox" inputName={groupId} inputId={groupId} />
      <Label labelId={groupId} labelName={labelName} />
    </div>
  );
};

export default CheckboxGroup;
