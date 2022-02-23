import {
  getElementValueById,
  setItemWithLocal,
  getDataFromLocalByKey,
} from "./process-data";

function checkLoginStatus() {
  if (!checkIsLogin()) {
    alert("Please sign in first");
    window.location.href = "/sign-in";
    return;
  }
  localStorage.removeItem("currentProject");
  checkAdmin();
}

window.addEventListener("load", () => {
  // checkLoginStatus();
});

function checkIsLogin() {
  if (checkIsRemember()) {
    return getDataFromLocalByKey("isLogin");
  }
  return JSON.parse(sessionStorage.getItem("isLogin"));
}

function checkIsRemember() {
  return getDataFromLocalByKey("isRemember");
}

function getUserListFromLocal() {
  return getDataFromLocalByKey("userdata") || [];
}

function checkAdmin() {
  const welcomeContent = document.getElementById("welcome-message");
  const currentUser = getDataFromLocalByKey("currentUser");
  if (currentUser.role !== "admin") {
    window.location.href = "/";
  }
}

function handleEditInput(idRef) {
  const genderValue = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  const roleValue = checkRole();
  return {
    userId: idRef,
    name: getElementValueById("name"),
    username: getElementValueById("username"),
    password: getElementValueById("password"),
    confirmPassword: getElementValueById("confirmPassword"),
    age: getElementValueById("age"),
    gender: genderValue,
    role: roleValue, //
  };
}

function cancelEdit() {
  // resetForm();
  disableForm();
}

function updateUser() {
  const idRef = JSON.parse(localStorage.getItem("ref"));
  const userList = getDataFromLocalByKey("userdata") || [];
  const {
    userId,
    name,
    username,
    password,
    confirmPassword,
    age,
    gender,
    role,
  } = handleEditInput(idRef);
  userList.forEach((value, index) => {
    if (value.userId === idRef) {
      value.userId = userId;
      value.name = name;
      value.username = username;
      value.password = password;
      value.confirmPassword = confirmPassword;
      value.age = age;
      value.role = role;
      value.gender = gender;
    }
  }); // ez clap
  console.log(userList);
  setItemWithLocal("userdata", userList);
  // renderUserList();
  // resetForm();
  disableForm();
}

function deleteUser(userId) {
  const userList = getUserListFromLocal();
  userList.forEach((value, index) => {
    if (value.userId === userId) {
      value.isDeleted = true;
    }
  });
  setItemWithLocal("userdata", userList);
  // renderUserList();
}

window.addEventListener("load", () => {
  // renderUserList();
  disableForm();
});

export function enableForm() {
  const form = document.getElementById("signUpAdminForm");
  const elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
  }
}

export function disableForm() {
  const form = document.getElementById("signUpAdminForm");
  const elements = form?.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }
} //

function checkRole() {
  const isAdmin = document.getElementById("setAdmin").checked;
  if (isAdmin === true) {
    return "admin";
  }
  return "user";
} //
