import React from "react";

const Text = (props) => {
  const { textId, className, content } = props;

  return (
    <span id={textId} className={className}>
      {content}
    </span>
  );
};

export default Text;
