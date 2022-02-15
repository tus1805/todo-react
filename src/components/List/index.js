import React from 'react';

const List = (props) => {
  const { listClass, listId, children } = props;

  return (
    <div className={listClass} id={listId}>
      {children}
    </div>
  );
};

export default List;
