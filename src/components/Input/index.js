import React from "react";

const Input = (props) => {
  const {
    inputId,
    onInputFunction,
    inputType,
    inputName,
    value,
    onChange,
    checked,
  } = props;
  return (
    <input
      id={inputId}
      type={inputType}
      onInput={onInputFunction}
      name={inputName}
      value={value}
      onChange={onChange}
      checked={checked}
    ></input>
  );
};

export default Input;
