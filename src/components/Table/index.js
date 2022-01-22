import React from 'react';

const Table = (props) => {
  const { tableId, children } = props;
  return (
    <>
      <table id={tableId}>{children}</table>
    </>
  );
};

export default Table;
