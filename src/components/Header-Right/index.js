import React from 'react';

const HeaderRight = (props) => {
  const { children } = props

  return (
    <div className="header-right">
      {children}
    </div>
  );
};

export default HeaderRight;
