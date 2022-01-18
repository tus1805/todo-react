import React from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import CheckboxGroup from "../../components/CheckboxGroup";
import FormGroup from "../../components/FormGroup";
import Link from "../../components/Link";

const SignIn = () => {
  return (
    <div class="form-container">
      <form name="signUpForm" onsubmit="onSubmitForm()">
        <h1>Sign In</h1>
        <FormGroup
          labelName="Username:"
          groupId="username"
          textClassName="error-message"
          inputType="text"
        />
        <FormGroup
          labelName="Password:"
          groupId="password"
          textClassName="error-message"
          inputType="password"
        />
        <ButtonSubmit buttonName="Sign in" />
        <CheckboxGroup groupId="remember" labelName="Remember account" />
        <Link path="/sign-up" linkName="Sign up now" />
      </form>
    </div>
  );
};

export default SignIn;
