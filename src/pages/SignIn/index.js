import React, { useState } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import CheckboxGroup from "../../components/CheckboxGroup";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import { Link } from "react-router-dom";

import {
  setItemWithLocal,
  setItemWithSession,
  getDataFromLocalByKey,
} from "../../utils/process-data";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../API/user";

const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  async function submitForm(e) {
    e.preventDefault();
    const token = await signIn(data);
    if (token !== "Username or password is not correct.") {
      console.log(token);
      setData({ username: "", password: "" });
      const isRemember = getDataFromLocalByKey("isRemember");
      isRemember === true
        ? setItemWithLocal("todoToken", token.token)
        : setItemWithSession("todoToken", token.token);
      // setItemWithLocal("userId ");
      alert("Login successfully");
      navigate("/");
    } else {
      alert("Username or password is not correct");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleRemember(e) {
    const isRemember = e.target.checked;
    setItemWithLocal("isRemember", isRemember);
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
          // handleInput={handleUsernameMessage}
          value={data.username}
          onChange={handleChange}
        />
        <FormGroup
          labelName="Password:"
          groupId="password"
          textClassName="error-message"
          inputType="password"
          // handleInput={handlePasswordMessage}
          value={data.password}
          onChange={handleChange}
        />
        <ButtonSubmit buttonName="Sign in" />
        <CheckboxGroup
          groupId="remember"
          labelName="Remember account"
          onChange={handleRemember}
        />
        <Link to="/sign-up">Sign up now</Link>
      </>
    </Form>
  );
};

export default SignIn;
