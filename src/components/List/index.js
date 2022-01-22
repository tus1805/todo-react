import React from 'react';

const List = (props) => {
  const {listClass, listId} = props

  return <div className={listClass} id={listId}></div>;
};

export default List;
