import React, { useState } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import CheckboxGroup from "../../components/CheckboxGroup";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import { Link } from "react-router-dom";
// import Link from "../../components/Link";
import {
  rememberCurrentUser,
  validateUsername,
  validatePassword,
  getCurrentUserInfo,
} from "../../utils/validate-signIn";
import {
  setItemWithLocal,
  setItemWithSession,
  getDataFromLocalByKey,
  getElementValueById,
} from "../../utils/process-data";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  console.log(data);

  function submitForm(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setData({ username: "", password: "" });
    alert("Login successfully");
    const isRemember = getDataFromLocalByKey("isRemember");
    isRemember
      ? setItemWithLocal("isLogin", true)
      : setItemWithSession("isLogin", true);
    navigate("/");
  }

  function validateForm() {
    const { username, password } = data;
    // rememberCurrentUser();
    if (!validateUsername(username) || !validatePassword(username, password)) {
      return false;
    }
    console.log("check current user", getCurrentUserInfo(username)[0]);
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
      formClassname="form-container"
      formName="signInForm"
      onSubmit={submitForm}
    >
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
        <Link to="/sign-up">Sign up now</Link>
      </>
    </Form>
  );
};

export default SignIn;
