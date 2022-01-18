import React from "react";

const Input = (props) => {
  const { inputId, onInputFunction, inputType, inputName } = props;
  return (
    <input
      id={inputId}
      type={inputType}
      onInput={onInputFunction}
      name={inputName}
    ></input>
  );
};

export default Input;
