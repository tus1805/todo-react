
function checkLoginStatus() {
  if (!checkIsLogin()) {
    alert('Please sign in first');
    window.location.href = "/sign-in"
    return;
  }
  localStorage.removeItem("currentProject");
  checkAdmin();
}

window.addEventListener("load", () => {
  checkLoginStatus();
})

function checkIsLogin() {
  if (checkIsRemember()) {
    return getItemFromLocal("isLogin");
  }
  return JSON.parse(sessionStorage.getItem("isLogin"));
}

function checkIsRemember() {
  return getItemFromLocal("isRemember");
}

function doLogOut() {
  localStorage.setItem("isLogin", false);
  sessionStorage.setItem("isLogin", false);
  localStorage.removeItem("currentUser");
  window.location.href = "/sign-in"
  return;
}

function setItemToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUserListFromLocal(){
  return getItemFromLocal("userdata") || [];
}

function checkAdmin() {
  const welcomeContent = document.getElementById('welcome-message');
  const currentUser = getItemFromLocal('currentUser');
  if (currentUser.role !== "admin") {
    window.location.href = "/"
  }
}

function renderUserList() { 
  const userList = getUserListFromLocal().filter(value => value.isDeleted !== true);
  let userListHTML = document.getElementById("user-table");
  userListHTML.innerHTML = "";
  userListHTML.innerHTML += `<tr>
					<th>Name</th>
					<th>Role</th>
				</tr>`;
  userList.forEach((user) => {
    userListHTML.innerHTML += addUserContent(user.name, user.userId, user.role);
  })
}

function addUserToList(name, role) {
  const table = document.getElementById("user-table");
  const row = table.insertRow(0);
  row.insertCell(0).innerHTML = name;
  row.insertCell(1).innerHTML = role;
}

function handleEditInput(idRef){
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
    role: roleValue,//
  }
}

function addUser(){
  resetForm();
  enableForm();
}

function editUser(userId){
  enableForm();
  const userList = getUserListFromLocal();
  userList.forEach((value, index) => {
    if (value.userId === userId){
      document.getElementById("name").value = value.name;
      document.getElementById("username").value = value.username;
      document.getElementById("password").value = value.password;
      document.getElementById("confirmPassword").value = value.confirmPassword;
      document.getElementById("age").value = value.age;
      if (value.gender === "male"){
        document.getElementById("male").checked = true;
      } else if (value.gender === "female"){
        document.getElementById("female").checked = true;
      }
      if(value.role === "admin"){
        document.getElementById("setAdmin").checked = true;
      } else {
        document.getElementById("setAdmin").checked = false;
      }
      localStorage.setItem("ref", value.userId);
    }
  });
  document.querySelector(".button-update-user").style.display = "inline";
  document.querySelector(".button-add-user").style.display = "none";
  return userList;
}

function cancelEdit(){
  resetForm();
  disableForm();
}

function updateUser(){
  const idRef = JSON.parse(localStorage.getItem("ref"));
  const userList = getItemFromLocal("userdata") || [];
  const { userId, name, username, password, confirmPassword, age, gender, role} = handleEditInput(idRef);
  userList.forEach((value, index) => {
    if (value.userId === idRef){
      value.userId = userId;
      value.name = name;
      value.username = username;
      value.password = password;
      value.confirmPassword = confirmPassword;
      value.age = age;
      value.role = role;
      value.gender = gender;
    }
  }) // ez clap
  console.log(userList)
  setItemToLocal("userdata", userList);
  renderUserList();
  resetForm();
  disableForm();
}

function deleteUser(userId){
  const userList = getUserListFromLocal();
  userList.forEach((value, index) => {
    if (value.userId === userId){
      value.isDeleted = true;
    }
  });
  setItemToLocal("userdata", userList);
  renderUserList();
}

function addUserContent(name, userId, role) {
  return `
      <div class="user-table">
      <span class="user-table-username">
      <tr class="user-table">
      <td>${name}</td>
      <td>${role}</td>
      </tr>
      </span>
      <span class="user-table-option">
      <button class="button-edit-task" onclick="editUser(${userId})">Edit</button>
      <button class="button-delete-task" onclick="deleteUser(${userId})">Delete</button>
      </span>
      </div>`
}

function getItemFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

window.addEventListener("load", () => {
  renderUserList();
  disableForm();
})

function enableForm() {
  const form = document.getElementById("signUpForm");
  const elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
  }
}//

function disableForm() {
  const form = document.getElementById("signUpForm");
  const elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }
}//

function getFormData() {
  const newId = Math.floor(Math.random() * 10000000) + 1;
  const genderValue = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  const roleValue = checkRole();
  return {
    userId: newId,
    name: getElementValueById("name"),
    username: getElementValueById("username"),
    password: getElementValueById("password"),
    confirmPassword: getElementValueById("confirmPassword"),
    age: getElementValueById("age"),
    gender: genderValue,
    role: roleValue,//
  };
}

function checkRole() {
  const isAdmin = document.getElementById("setAdmin").checked;
  if (isAdmin === true) {
    return "admin";
  }
  return "user";
}//


