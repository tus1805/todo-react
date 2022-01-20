import React from "react";

const Form = (props) => {
  const { formClassname, formName, onSubmit, children } = props;

  return (
    <div className={formClassname}>
      <form name={formName} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;
