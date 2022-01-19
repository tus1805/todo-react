import React from "react";
import Label from "../Label";

const RadioGroup = (props) => {
  const { radioGroupName, children } = props;

  return (
    <div className="radio-group">
      <Label labelName={radioGroupName}/>
        {children}
    </div>
  );
};

export default RadioGroup;
