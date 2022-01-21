import React from 'react';

const Table = (props) => {
  const {tableClassName, tableId, children} = props
  return <div className={tableClassName}>
    <table id={tableId}>
      {children}
    </table>
  </div>;
};

export default Table;
