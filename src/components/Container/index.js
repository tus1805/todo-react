import React from 'react';

const Container = (props) => {
  const { containerName, children } = props

  return (
    <div className={containerName}>
      {children}
    </div>
  );
};

export default Container;
