import React, { useState } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import CheckboxGroup from "../../components/CheckboxGroup";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import Link from "../../components/Link";
import {
  rememberCurrentUser,
  validateUsername,
  validatePassword,
  getCurrentUserInfo,
  getElementValueById,
} from "../../utils/validate-signIn";
import {
  setItemWithLocal,
  setItemWithSession,
  getDataFromLocalByKey,
} from "../../utils/process-data";

const SignIn = (props) => {
  const { changeLink } = props;
  const [data, setData] = useState({ username: "", password: "" });
  console.log(data);

  function submitForm() {
    if (!validateForm) {
      return;
    }
    setData({ username: "", password: "" });
    alert("Login successfully");
    window.location.href = "/";
    const isRemember = getDataFromLocalByKey("isRemember");
    isRemember
      ? setItemWithLocal("isLogin", true)
      : setItemWithSession("isLogin", true);
  }

  function validateForm() {
    const { username, password } = data;
    if (!validateUsername(username) || !validatePassword(username, password)) {
      return false;
    }
    setItemWithLocal("currentUser", getCurrentUserInfo(username)[0]);
    return true;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleUsernameMessage(e) {
    const username = getElementValueById("username");
    validateUsername(username);
  }

  function handlePasswordMessage(e) {
    const username = getElementValueById("username");
    const password = getElementValueById("password");
    validatePassword(username, password);
  }

  return (
    <Form
      formName="signInForm"
      onSubmit={submitForm}
      children={
        <>
          <h1>Sign In</h1>
          <FormGroup
            labelName="Username:"
            groupId="username"
            textClassName="error-message"
            inputType="text"
            handleInput={handleUsernameMessage}
            value={data.username}
            onChange={handleChange}
          />
          <FormGroup
            labelName="Password:"
            groupId="password"
            textClassName="error-message"
            inputType="password"
            handleInput={handlePasswordMessage}
            value={data.password}
            onChange={handleChange}
          />
          <ButtonSubmit buttonName="Sign in" />
          <CheckboxGroup
            groupId="remember"
            labelName="Remember account"
            onChange={rememberCurrentUser}
          />
          <Link linkName="Sign up now" onClick={changeLink} />
        </>
      }
    />
  );
};

export default SignIn;
