import React from "react";

const Link = (props) => {
  const { linkName, onClick } = props;

  return (
    <p className="linkpath" onClick={onClick}>
      {linkName}
    </p>
  );
};

export default Link;
