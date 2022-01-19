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