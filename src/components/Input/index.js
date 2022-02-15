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
    onClick,
  } = props;
  return (
    <input
      id={inputId}
      type={inputType}
      onInput={onInputFunction}
      name={inputName}
      value={value}
      onChange={onChange}
      defaultChecked={checked}
      onClick={onClick}
    ></input>
  );
};

export default Input;
