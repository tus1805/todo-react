import React, { useState } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
import CheckboxGroup from "../../components/CheckboxGroup";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import Link from "../../components/Link";
import RadioGroup from '../../components/RadioButtonGroup';
import RadioButton from '../../components/RadioButton';
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateAge,
  getElementValueById,
  NOTI_MESSAGE,
} from "../../utils/validate-signUp";
import {
  setItemWithLocal,
  setItemWithSession,
  getDataFromLocalByKey,
} from "../../utils/process-data";


const SignUp = () => {
  const [data, setData] = useState({ username: "", password: "" });
  function submitForm() {
    const { userId, name, username, password, confirmPassword, age, gender, role } = getFormData();
    const existUserData = JSON.parse(localStorage.getItem('userdata')) || [];
    const userData = { userId, name, username, password, age, gender, role }
    userData.role = "user"
    if (!validateForm()) {
      return;
    }
    resetForm();
    existUserData.push(userData);
    localStorage.setItem('userdata', JSON.stringify(existUserData));
    alert(NOTI_MESSAGE.SUCCESS);
    window.location.href = "/sign-in";
  }

  function validateForm() {
    const { name, username, password, confirmPassword, age, gender } = getFormData();
    if (
      !validateName(name) ||
      !validateUsername(username) ||
      !validatePassword(password) ||
      !validateConfirmPassword(password, confirmPassword) ||
      !validateAge(age) ||
      !gender
    ) {
      return false;
    }
    return true;
  }

  function getFormData() {
    const newId = Math.floor(Math.random() * 10000000) + 1;
    const genderValue = document.querySelector(
      'input[name="gender"]:checked'
    ).value;
    // const roleValue = checkRole();
    return {
      userId: newId,
      name: getElementValueById("name"),
      username: getElementValueById("username"),
      password: getElementValueById("password"),
      confirmPassword: getElementValueById("confirmPassword"),
      age: getElementValueById("age"),
      gender: genderValue,
      role: "user",
    };
  }

  function resetForm() {
    resetInputForm()
    resetMessageForm()
  }

  function resetInputForm() {
    resetElementValueById("name");
    resetElementValueById("username");
    resetElementValueById("password");
    resetElementValueById("confirmPassword");
    resetElementValueById("age");
  }

  function resetMessageForm() {
    resetElementContentById("name-error-message");
    resetElementContentById("username-error-message");
    resetElementContentById("password-error-message");
    resetElementContentById("confirmPassword-error-message");
    resetElementContentById("age-error-message");
  }

  function resetElementValueById(id) {
    const currentElement = document.getElementById(id);
    currentElement.value = "";
  }
  
  function resetElementContentById(id) {
    const currentElement = document.getElementById(id);
    currentElement.innerHTML = "";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleNameMessage(e){
    const name = getElementValueById("name");
    validateName(name);
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

  function handleConfirmPasswordMessage(e) {
    const password = getElementValueById("password");
    const confirmPassword = getElementValueById("confirmPassword");
    validateConfirmPassword(password, confirmPassword);
  }
  function handleAgeMessage(e){
    const age = getElementValueById("age");
    validateAge(age);
  }

  return (
    <Form
      formName="signUpForm"
      onSubmit={submitForm}
      children={
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
                    value={data.gender}
                  />
                  <RadioButton
                    labelName="Female:"
                    groupId="female"
                    value={data.gender}
                  />
                </>
              }
            />
          </div>
          <ButtonSubmit buttonName="Sign in" />
          <CheckboxGroup groupId="remember" labelName="Remember account" />
          {/* <Link path="/sign-up" linkName="Sign up now" /> */}
        </>
      }
    />
  )
}

export default SignUp
