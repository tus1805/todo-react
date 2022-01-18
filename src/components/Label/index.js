import React from "react";

const Label = (props) => {
  const { labelName, labelId } = props;
  return <label for={labelId}>{labelName}</label>;
};

export default Label;
