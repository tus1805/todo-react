import React from "react";

const Form = (props) => {
  const { formClassname, formName, onSubmit, children, formId } = props;

  return (
    <div className={formClassname}>
      <form name={formName} onSubmit={onSubmit} id={formId}>
        {children}
      </form>
    </div>
  );
};

export default Form;
