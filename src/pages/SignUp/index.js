import React, { useState } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import RadioGroup from "../../components/RadioButtonGroup";
import RadioButton from "../../components/RadioButton";
import { NOTI_MESSAGE } from "../../constants/validate";
import { useNavigate, Link } from "react-router-dom";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateAge,
} from "../../utils/validate-signUp";
import { getElementValueById } from "../../utils/helper-validate";
import { signUp } from "../../API/user";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });

  async function submitForm(e) {
    e.preventDefault();
    let userData = {};
    userData.isAdmin = false;
    userData.name = data.name;
    userData.username = data.username;
    userData.password = data.password;
    userData.age = data.age;
    userData.gender = data.gender;
    // console.log(userData);
    if (!validateForm()) {
      return;
    }
    await signUp(userData);
    setData({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
    });
    alert(NOTI_MESSAGE.SUCCESS);
    navigate("/sign-in");
  }

  function validateForm() {
    if (
      !validateName(data.name) ||
      !validateUsername(data.username) ||
      !validatePassword(data.password) ||
      !validateConfirmPassword(data.password, data.confirmPassword) ||
      !validateAge(data.age) ||
      !data.gender
    ) {
      return false;
    }
    return true;
  }

  function getGenderValue(e) {
    const gender = e.target.value;
    const newData = { ...data };
    newData.gender = gender;
    setData(newData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleNameMessage(e) {
    const name = e.target.value;
    validateName(name);
  }

  function handleUsernameMessage(e) {
    const username = e.target.value;
    validateUsername(username);
  }

  function handlePasswordMessage(e) {
    const password = e.target.value;
    validatePassword(password);
  }

  function handleConfirmPasswordMessage(e) {
    const password = getElementValueById("password");
    const confirmPassword = e.target.value;
    validateConfirmPassword(password, confirmPassword);
  }
  function handleAgeMessage(e) {
    const age = e.target.value;
    validateAge(age);
  }

  return (
    <Form
      formClassname="form-container"
      formName="signUpForm"
      onSubmit={submitForm}
      formId="signUpForm"
    >
      <>
        <h1>Sign Up</h1>
        <FormGroup
          labelName="Name:"
          groupId="name"
          textClassName="error-message"
          inputType="name"
          handleInput={handleNameMessage}
          value={data.name}
          onChange={handleChange}
        />
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
        <FormGroup
          labelName="Confirm Password:"
          groupId="confirmPassword"
          textClassName="error-message"
          inputType="password"
          handleInput={handleConfirmPasswordMessage}
          value={data.confirmPassword}
          onChange={handleChange}
        />
        <FormGroup
          labelName="Age:"
          groupId="age"
          textClassName="error-message"
          inputType="number"
          handleInput={handleAgeMessage}
          value={data.age}
          onChange={handleChange}
        />
        <div>
          <RadioGroup
            radioGroupName="Gender:"
            children={
              <>
                <RadioButton
                  labelName="Male"
                  groupId="male"
                  value="male"
                  inputName="gender"
                  onChange={getGenderValue}
                />
                <RadioButton
                  labelName="Female"
                  groupId="female"
                  value="female"
                  inputName="gender"
                  onChange={getGenderValue}
                />
              </>
            }
          />
        </div>
        <ButtonSubmit buttonName="Sign up" />
        <Link to="/sign-in">Want to sign in?</Link>
      </>
    </Form>
  );
};

export default SignUp;
