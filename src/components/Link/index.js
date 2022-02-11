import React from "react";

const Link = (props) => {
  const { linkName, link } = props;

  return (
    <a className="linkpath" href={link}>
      {linkName}
    </a>
  );
};

export default Link;
