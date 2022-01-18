import React from "react";

const Label = (props) => {
  const { labelName } = props;
  return <label for={labelName}></label>;
};

export default Label;
