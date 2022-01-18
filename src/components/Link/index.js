import React from "react";

const Link = (props) => {
  const { path, linkName } = props;

  return <a href={path}>{linkName}</a>;
};

export default Link;
