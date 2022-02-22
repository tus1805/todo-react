import React, { useState, useEffect } from "react";
import ButtonSubmit from "../../../components/ButtonSubmit";
import Form from "../../../components/Form";
import FormGroup from "../../../components/FormGroup";
import RadioGroup from "../../../components/RadioButtonGroup";
import RadioButton from "../../../components/RadioButton";
import { NOTI_MESSAGE } from "../../../constants/validate";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateAge,
} from "../../../utils/validate-signUp";
import { getElementValueById } from "../../../utils/helper-validate";
import { setItemWithLocal } from "../../../utils/process-data";
import CheckboxGroup from "../../../components/CheckboxGroup";
import { signUp } from "../../../API/user";
import { enableForm, disableForm } from "../../../utils/user-admin";

const SignUpAdmin = (props) => {
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
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    isDisable ? disableForm() : enableForm();
  }, [isDisable]);

  async function submitForm(e) {
    e.preventDefault();
    let userData = {};
    userData.isAdmin = false;
    userData.name = data.name;
    userData.username = data.username;
    userData.password = data.password;
    userData.age = data.age;
    userData.gender = data.gender;
    console.log(userData);
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
      role: "",
    });
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
  function setAdmin(){}

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
        <CheckboxGroup
          groupId="setAdmin"
          labelName="Set admin"
          onChange={setAdmin}
        >
        </CheckboxGroup>
        <ButtonSubmit buttonName="Sign up" />
      </>
    </Form>
  );
};

export default SignUpAdmin;
