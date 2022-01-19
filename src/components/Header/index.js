import React from 'react';

const Header = (props) => {
  const { headerName, children } = props

  return (
    <div className={headerName}>
      {children}
    </div>
  );
};

export default Header;
