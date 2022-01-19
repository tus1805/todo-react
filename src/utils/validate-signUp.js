import { ERROR_MESSAGE } from "../constants/error-message-signUp";
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_WORD_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_AGE,
  MAX_AGE,
  ENTER_KEY,
  TAB_KEY
} from "../constants/validate";
import {
  validateRequire,
  validateIsInRange,
  validateHasNumber,
  validateMaxLength,
  validateMinLength,
  validateMinWord,
  validateHasSpecialChar,
  validateHasUpperChar,
  validateHasLowerChar,
  validateHasMultipleNumber,
  validateHasExisted,
  validateHasSameValue,
  setMessageForElementByFieldName,
  successMessage
} from "./helper";

export function validateName(name) {
  if (!validateRequire('name', name) ||
    validateMinLength('name', name, MIN_NAME_LENGTH, ERROR_MESSAGE.NAME_LENGTH) ||
    validateMaxLength('name', name, MAX_NAME_LENGTH, ERROR_MESSAGE.NAME_LENGTH) ||
    validateMinWord('name', name, MIN_WORD_NAME_LENGTH) ||
    validateHasNumber('name', name, ERROR_MESSAGE.HAS_NOT_NUMBER)
  ) {
    return false;
  }
  setMessageForElementByFieldName('name', ERROR_MESSAGE.SUCCESS);
  successMessage('name');
  return true;
}

export function validateUsername(username) {
  if (!validateRequire('username', username) ||
    validateMinLength('username', username, MIN_USERNAME_LENGTH, ERROR_MESSAGE.USERNAME_LENGTH) ||
    validateMaxLength('username', username, MAX_USERNAME_LENGTH, ERROR_MESSAGE.USERNAME_LENGTH) ||
    validateHasSpecialChar('username', username) ||
    validateHasExisted('username', username)
  ) {
    return false;
  }
  setMessageForElementByFieldName('username', ERROR_MESSAGE.SUCCESS);
  successMessage('username');
  return true;
}

export function validatePassword(password) {
  if (!validateRequire('password', password) ||
    !validateHasNumber('password', password, ERROR_MESSAGE.PASSWORD_RULE) ||
    !validateHasLowerChar('password', password) ||
    !validateHasUpperChar('password', password) ||
    validateMinLength('password', password, MIN_PASSWORD_LENGTH, ERROR_MESSAGE.PASSWORD_LENGTH) ||
    validateMaxLength('password', password, MAX_PASSWORD_LENGTH, ERROR_MESSAGE.PASSWORD_LENGTH) ||
    validateHasMultipleNumber('password', password)
  ) {
    return false;
  }
  setMessageForElementByFieldName('password', ERROR_MESSAGE.SUCCESS);
  successMessage('password');
  return true;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!validateRequire('confirmPassword', confirmPassword) ||
    !validateHasSameValue('confirmPassword', password, confirmPassword)) {
    return false;
  }
  setMessageForElementByFieldName('confirmPassword', ERROR_MESSAGE.SUCCESS);
  successMessage('confirmPassword');
  return true;
}

export function validateAge(age) {
  if (!validateRequire('age', age) ||
    !validateIsInRange('age', age, MIN_AGE, MAX_AGE)
  ) {
    return false;
  }
  setMessageForElementByFieldName('age', ERROR_MESSAGE.SUCCESS);
  successMessage('age');
  return true;
}

// utils methods
// function validateRequire(fieldName, value) {
//   setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.EMPTY);
//   return Boolean(value);
// }

// function validateIsInRange(fieldName, value, minValue, maxValue) {
//   if (parseInt(value) < minValue ||
//     parseInt(value) > maxValue) {
//     setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.AGE_VALUE);
//     return false;
//   }
//   return true;
// }

// function validateHasNumber(fieldName, value, message) {
//   setMessageForElementByFieldName(fieldName, message);
//   return value.split("").filter((char) => validateIsNumber(char)).length > 0;
// }

// function validateMaxLength(fieldName, value, maxValue, message) {
//   setMessageForElementByFieldName(fieldName, message);
//   return value.length > maxValue;
// }

// function validateMinLength(fieldName, value, minValue, message) {
//   setMessageForElementByFieldName(fieldName, message);
//   return value.length < minValue;
// }

// function validateMinWord(fieldName, value, minValue) {
//   setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.WORD_NAME_LENGTH);
//   return value.split(" ").length < minValue;
// }

// function validateHasSpecialChar(fieldName, value) {
//   const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
//   for (let i = 0; i < specialChars.length; i++) {
//     if (value.indexOf(specialChars[i]) > -1) {
//       setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.SPECIAL_CHAR);
//       return true;
//     }
//   }
//   return false;
// }

// function validateHasUpperChar(fieldName, value) {
//   return value.split("").some((char) => {
//     if (validateIsNumber(char)) {
//       return false;
//     }
//     setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.HAS_UPPER_CHAR);
//     return char === char.toUpperCase();
//   });
// }

// function validateHasLowerChar(fieldName, value) {
//   return value.split("").some((char) => {
//     if (validateIsNumber(char)) {
//       return false;
//     }
//     setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.HAS_LOWER_CHAR);
//     return char === char.toLowerCase();
//   });
// }

// function validateIsNumber(char) {
//   return !Number.isNaN(parseInt(char));
// }

// function validateHasMultipleNumber(fieldName, value) {
//   const charArr = value.split("");
//   return charArr.some((char, index) => {
//     if (validateIsNumber(char)) {
//       if (
//         validateIsNumber(charArr[index + 1]) &&
//         validateIsNumber(charArr[index + 2])
//       ) {
//         setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.HAS_MUL_NUMBER);
//         return true;
//       }
//       return false;
//     }
//     return false;
//   });
// }

// function validateHasExisted(fieldName, value) {
//   const userData = JSON.parse(localStorage.getItem("userdata")) || [];
//   const filteredList = userData.filter(task => task.username === value);
//   if (filteredList.length === 0) {
//     return false;
//   }
//   setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.EXIST_USERNAME);
//   return true;
// }

// function validateHasSameValue(fieldName, firstValue, secondValue) {
//   if (firstValue === secondValue) {
//     return true;
//   }
//   setMessageForElementByFieldName(fieldName, ERROR_MESSAGE.SAME_VALUE);
//   return false;
// }

// export function resetElementValueById(id) {
//   const currentElement = document.getElementById(id);
//   currentElement.value = "";
// }

// export function resetElementContentById(id) {
//   const currentElement = document.getElementById(id);
//   currentElement.innerHTML = "";
// }

// export function getElementValueById(id) {
//   return document.getElementById(id).value;
// }

// function setMessageForElementByFieldName(fieldName, message) {
//   const id = `${fieldName}-error-message`;
//   const currentElement = document.getElementById(id);
//   currentElement.innerHTML = message;
//   currentElement.classList.remove('success');
// }

// function successMessage(fieldName) {
//   const id = `${fieldName}-error-message`;
//   document.getElementById(id).classList.add('success');
// }