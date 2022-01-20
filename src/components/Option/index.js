import React from 'react';

const Option = (props) => {
  const {value, name} = props
  return <option value={value}>{name}</option>;
};

export default Option;
