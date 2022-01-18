import React from "react";

const Form = (props) => {
  const { formName, onSubmit, children } = props;

  return (
    <div className="form-container">
      <form name={formName} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;
