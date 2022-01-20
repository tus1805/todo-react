import React, { useState, useEffect } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import RadioGroup from "../../components/RadioButtonGroup";
import RadioButton from "../../components/RadioButton";
import { NOTI_MESSAGE } from "../../constants/validate";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateAge,
} from "../../utils/validate-signUp";
import { resetForm, getElementValueById } from "../../utils/helper-validate";

const SignUp = (props) => {
  const { changeLink } = props;
  const [data, setData] = useState({
    userId: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    role: "",
  });
  const [genderValue, setGenderValue] = useState("");
  function submitForm(e) {
    e.preventDefault();
    const newId = Math.floor(Math.random() * 10000000) + 1;
    const existUserData = JSON.parse(localStorage.getItem("userdata")) || [];
    const userData = data;
    userData.userId = newId;
    userData.role = "user";
    console.log(userData);
    if (!validateForm()) {
      return;
    }
    resetForm();
    existUserData.push(userData);
    localStorage.setItem("userdata", JSON.stringify(existUserData));
    alert(NOTI_MESSAGE.SUCCESS);
    changeLink(0);
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
    setGenderValue(e.target.value);
  }

  useEffect(() => {
    const newData = data;
    newData.gender = genderValue;
    setData(newData);
  }, [genderValue]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleNameMessage(e) {
    const name = getElementValueById("name");
    validateName(name);
  }

  function handleUsernameMessage(e) {
    const username = getElementValueById("username");
    validateUsername(username);
  }

  function handlePasswordMessage(e) {
    const password = getElementValueById("password");
    validatePassword(password);
  }

  function handleConfirmPasswordMessage(e) {
    const password = getElementValueById("password");
    const confirmPassword = getElementValueById("confirmPassword");
    validateConfirmPassword(password, confirmPassword);
  }
  function handleAgeMessage(e) {
    const age = getElementValueById("age");
    validateAge(age);
  }

  return (
    <Form
      formClassname="form-container"
      formName="signUpForm"
      onSubmit={submitForm}>
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
                  labelName="Male:"
                  groupId="male"
                  value="male"
                  inputName="gender"
                  onChange={getGenderValue}
                />
                <RadioButton
                  labelName="Female:"
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
      </>
    </Form>
  );
};

export default SignUp;
