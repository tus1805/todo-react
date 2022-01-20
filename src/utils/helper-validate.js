import { ERROR_MESSAGE } from "../constants/error-message-signUp";

export function validateRequire(fieldName, value) {
  setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.EMPTY);
  return Boolean(value);
}

export function validateIsInRange(fieldName, value, minValue, maxValue) {
  if (parseInt(value) < minValue ||
    parseInt(value) > maxValue) {
    setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.AGE_VALUE);
    return false;
  }
  return true;
}

export function validateHasNumber(fieldName, value, message) {
  setMessageForElementByFieldName(fieldName, message);
  return value.split("").filter((char) => validateIsNumber(char)).length > 0;
}

export function validateMaxLength(fieldName, value, maxValue, message) {
  setMessageForElementByFieldName(fieldName, message);
  return value.length > maxValue;
}

export function validateMinLength(fieldName, value, minValue, message) {
  setMessageForElementByFieldName(fieldName, message);
  return value.length < minValue;
}

export function validateMinWord(fieldName, value, minValue) {
  setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.WORD_NAME_LENGTH);
  return value.split(" ").length < minValue;
}

export function validateHasSpecialChar(fieldName, value) {
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  for (let i = 0; i < specialChars.length; i++) {
    if (value.indexOf(specialChars[i]) > -1) {
      setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.SPECIAL_CHAR);
      return true;
    }
  }
  return false;
}

export function validateHasUpperChar(fieldName, value) {
  return value.split("").some((char) => {
    if (validateIsNumber(char)) {
      return false;
    }
    setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.HAS_UPPER_CHAR);
    return char === char.toUpperCase();
  });
}

export function validateHasLowerChar(fieldName, value) {
  return value.split("").some((char) => {
    if (validateIsNumber(char)) {
      return false;
    }
    setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.HAS_LOWER_CHAR);
    return char === char.toLowerCase();
  });
}

export function validateIsNumber(char) {
  return !Number.isNaN(parseInt(char));
}

export function validateHasMultipleNumber(fieldName, value) {
  const charArr = value.split("");
  return charArr.some((char, index) => {
    if (validateIsNumber(char)) {
      if (
        validateIsNumber(charArr[index + 1]) &&
        validateIsNumber(charArr[index + 2])
      ) {
        setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.HAS_MUL_NUMBER);
        return true;
      }
      return false;
    }
    return false;
  });
}

export function validateHasExisted(fieldName, value) {
  const userData = JSON.parse(localStorage.getItem("userdata")) || [];
  const filteredList = userData.filter(task => task.username === value);
  if (filteredList.length === 0) {
    return false;
  }
  setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.EXIST_USERNAME);
  return true;
}

export function validateHasSameValue(fieldName, firstValue, secondValue) {
  if (firstValue === secondValue) {
    return true;
  }
  setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.SAME_VALUE);
  return false;
}

export function resetElementValueById(id) {
  const currentElement = document.getElementById(id);
  currentElement.value = "";
}

export function resetElementContentById(id) {
  const currentElement = document.getElementById(id);
  currentElement.innerHTML = "";
}

export function getElementValueById(id) {
  return document.getElementById(id).value;
}

export function setMessageForElementByFieldName(fieldName, message) {
  const id = `${fieldName}-error-message`;
  const currentElement = document.getElementById(id);
  currentElement.innerHTML = message;
  currentElement.classList.remove('success');
}

export function successMessage(fieldName) {
  const id = `${fieldName}-error-message`;
  document.getElementById(id).classList.add('success');
}

export function resetForm() {
  resetInputForm()
  resetMessageForm()
}

export function resetInputForm() {
  resetElementValueById("name");
  resetElementValueById("username");
  resetElementValueById("password");
  resetElementValueById("confirmPassword");
  resetElementValueById("age");
}

export function resetMessageForm() {
  resetElementContentById("name-error-message");
  resetElementContentById("username-error-message");
  resetElementContentById("password-error-message");
  resetElementContentById("confirmPassword-error-message");
  resetElementContentById("age-error-message");
}