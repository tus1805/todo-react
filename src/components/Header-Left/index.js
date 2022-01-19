import React from 'react';

const HeaderLeft = (props) => {
  const { children } = props

  return (
    <div className="header-left">
      {children}
    </div>
  );
};

export default HeaderLeft;
