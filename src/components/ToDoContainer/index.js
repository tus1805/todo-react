import React from 'react';

const ToDoContainer = (props) => {
  const { children } = props
  return <div className="todo-container">
    {children}
  </div>;
};

export default ToDoContainer;
