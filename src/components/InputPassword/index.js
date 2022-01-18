import React from "react";

const InputPassword = (props) => {
  const { inputId, onInputFunction } = props;

  return <input id={inputId} type="password" onInput={onInputFunction}></input>;
};

export default InputPassword;
