import React from "react";

const Button = (props) => {
  const { buttonClass, onClick, buttonName } = props;
  return <button type="button" className={buttonClass} onClick={onClick}>{buttonName}</button>;
};

export default Button;
