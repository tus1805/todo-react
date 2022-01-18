import React from "react";

const ButtonSubmit = (props) => {
  const { buttonName } = props;
  return <button type="submit">{buttonName}</button>;
};

export default ButtonSubmit;
