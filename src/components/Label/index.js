import React from "react";

const Label = (props) => {
  const { labelName, labelId } = props;
  return <label htmlFor={labelId}>{labelName}</label>;
};

export default Label;
