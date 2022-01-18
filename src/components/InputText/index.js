import React from "react";

const InputText = (props) => {
  const { inputId, onInputFunction } = props;
  return <input id={inputId} type="text" onInput={onInputFunction}></input>;
};

export default InputText;
