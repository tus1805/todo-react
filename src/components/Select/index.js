import React from 'react';

const Select = (props) => {
  const {name, selectId, selectClass, onChange, children} = props
  return (
    <select
      name={name}
      id={selectId}
      className={selectClass}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
