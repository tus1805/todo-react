import React from "react";

const ButtonSubmit = (props) => {
  const { buttonName, buttonClass } = props;
  return <button type="submit" className={buttonClass}>{buttonName}</button>;
};

export default ButtonSubmit;
