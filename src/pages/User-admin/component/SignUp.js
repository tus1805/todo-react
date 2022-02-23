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
import { getElementValueById, resetForm } from "../../../utils/helper-validate";
import { setItemWithLocal } from "../../../utils/process-data";
import CheckboxGroup from "../../../components/CheckboxGroup";
import { signUp } from "../../../API/user";
import { enableForm, disableForm } from "../../../utils/user-admin";
import { getAllUser, getUserById } from "../../../API/user";
import Button from "../../../components/Button";

const SignUpAdmin = (props) => {
  const { userList, setUserList, setCurrentUser } = props;
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

  async function renderUser() {
    const userData = await getAllUser();
    const notDeleteUser = userData.filter((user) => user.isDeleted === false);
    let filteredUser = notDeleteUser;
    setUserList(filteredUser);
  }


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
    // setIsDisable(true);
    renderUser();
  }

  async function updateUser(userId) {
    console.log("edit");
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

  useEffect(() => {
    const newData = data;
    newData.gender = genderValue;
    setData(newData);
  }, [genderValue]);

  function cancelEdit(){
    resetForm();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data)
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
        <ButtonSubmit buttonName="Confirm" buttonClass="button-add-user" />
        <Button buttonName="Update" buttonClass="button-update-user" onClick={updateUser}/>
        <Button buttonName="Cancel" buttonClass="button-cancel" onClick={cancelEdit}/>
      </>
    </Form>
  );
};

export default SignUpAdmin;
