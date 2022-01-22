import { ERROR_MESSAGE } from "../constants/error-message-signIn";
import { getDataFromLocalByKey, setItemWithLocal } from "./process-data";

export function validateUsername(username) {
  if (
    !validateRequire("username", username) ||
    !validateExistUsename(username)
  ) {
    return false;
  }
  setMessageForElementByFieldName("username", ERROR_MESSAGE.SUCCESS);
  successMessage("username");
  return true;
}

export function validatePassword(username, password) {
  if (
    !validateRequire("password", password) ||
    !validateCorrectPassword(username, password)
  ) {
    return false;
  }
  setMessageForElementByFieldName("password", ERROR_MESSAGE.SUCCESS);
  successMessage("password");
  return true;
}

export function validateExistUsename(username) {
  const currentUser = getCurrentUserInfo(username);
  if (currentUser.length < 1) {
    setMessageForElementByFieldName("username", ERROR_MESSAGE.NOT_EXIST);
    return false;
  }
  return true;
}

export function getCurrentUserInfo(username) {
  return getDataFromLocalByKey("userdata").filter(
    (value) => value.username === username
  );
}


function setMessageForElementByFieldName(fieldName, message) {
  const id = `${fieldName}-error-message`;
  const currentElement = document.getElementById(id);
  currentElement.innerHTML = message;
  currentElement.classList.remove("success");
}

function validateCorrectPassword(username, password) {
  const currentUser = getCurrentUserInfo(username);
  if (currentUser[0]?.password === password) {
    return true;
  }
  setMessageForElementByFieldName("password", ERROR_MESSAGE.WRONG_PASSWORD);
  return false;
}

function validateRequire(fieldName, value) {
  setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.EMPTY);
  return Boolean(value);
}

function successMessage(fieldName) {
  const id = `${fieldName}-error-message`;
  document.getElementById(id).classList.add("success");
}

export function rememberCurrentUser() {
  setItemWithLocal("isRemember", document.getElementById("remember").checked);
}
