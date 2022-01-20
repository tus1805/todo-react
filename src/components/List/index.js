import React from 'react';

const List = (props) => {
  const {listClass, listId} = props

  return <div class={listClass} id={listId}></div>;
};

export default List;
