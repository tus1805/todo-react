import {
  checkAdmin,
  checkIsLogin,
  getItemFromLocal,
  setItemToLocal,
  getTaskFromLocal,
  resetForm,
} from "./helper-log-status";

export function checkLoginStatus() {
  if (!checkIsLogin()) {
    alert("Please sign in first");
    window.location.href = "./sign-in";
    return;
  }
  welcomeUser();
  // checkAdmin();
  renderTaskList();
}

export function welcomeUser() {
  const welcomeContent = document.getElementById("welcome-message");
  const currentUser = getItemFromLocal("currentUser");
  welcomeContent.innerHTML = `Hello ${currentUser.name}, welcome to your Todolist`;
}

//TO DO list
export function handleInputTask() {
  return document.getElementById("add-task-field").value;
}

// export function addTask() {
//   const newId = Math.floor(Math.random() * 10000000) + 1;
//   const newTaskName = handleInputTask();
//   const currentUsername = getItemFromLocal("currentUser").username;
//   const newTask = { "taskId": newId, "taskName": newTaskName, "username": currentUsername, "isDone": false }
//   newTask.isCreatedByAdmin = getItemFromLocal("currentUser").role === "admin"
//   const taskList = getTaskFromLocal();
//   taskList.push(newTask);
//   setItemToLocal("taskList", taskList);
//   resetForm();
//   renderTaskList();
// }

export function renderTaskList(chosenOption) {
  const currentUsername = getItemFromLocal("currentUser").username;
  const userTaskList = getTaskFromLocal()
    .filter((task) => task.username === currentUsername)
    .filter((value) => value.isDeleted !== true);
  const taskList = handleFilter(userTaskList, chosenOption);
  let taskHTML = document.getElementById("todo-list");
  taskHTML.innerHTML = "";
  const taskIndexDone = [];
  taskList.forEach((value, index) => {
    taskHTML.innerHTML += taskItemContent(value.taskName, value.taskId);
    if (value.isDone === true) {
      taskIndexDone.push(index);
    }
  });
  checkDone(taskIndexDone);
}
export function checkDone(array) {
  array.forEach((value) => {
    document.querySelectorAll("#checkbox")[value].checked = true;
  });
}

export function taskItemContent(taskName, id) {
  return `<div class="todo-item">
      <span class="todo-item-taskname">
      <input type="checkbox" key="${id}" id="checkbox" onclick="checkIsDone(${id})">
      <label>${taskName}</label>
      </span>
      <span class="todo-item-option">
      <button class="button-edit-task" onclick="editTask(${id})">Edit</button>
      <button class="button-delete-task" onclick="deleteTask(${id})">Delete</button>
      </span>
      </div>`;
}

export function checkIsDone(key) {
  const taskList = getTaskFromLocal();
  taskList.forEach((value, index) => {
    if (value.taskId === key) {
      value.isDone = !value.isDone;
    }
  });
  setItemToLocal("taskList", taskList);
}

export function deleteTask(idTask) {
  const taskList = getTaskFromLocal();
  taskList.forEach((value, index) => {
    if (value.taskId === idTask) {
      value.isDeleted = true;
    }
  });
  setItemToLocal("taskList", taskList);
  renderTaskList();
}

export function editTask(idTask) {
  const taskList = getTaskFromLocal();
  const editTask = taskList.forEach((value, index) => {
    if (value.taskId === idTask) {
      document.getElementById("add-task-field").value = value.taskName;
      setItemToLocal("ref", value.taskId);
    }
  });
  document.querySelector(".button-update-task").style.display = "inline";
  document.querySelector(".button-add-task").style.display = "none";
  return editTask;
}

// export function updateTask() {
//   const idRef = getItemFromLocal("ref");
//   const updatedTaskName = handleInputTask();
//   const taskList = getTaskFromLocal();
//   taskList.forEach((value, index) => {
//     if (value.taskId === idRef) {
//       value.taskName = updatedTaskName;
//     }
//   });
//   setItemToLocal("taskList", taskList);
//   renderTaskList();
//   resetForm();
// }

//filter todolist
// export function handleFilterOption() {
//   const chosenOption = document.getElementById("filter").value;
//   renderTaskList(chosenOption);
//   return chosenOption;
// }

export function handleFilter(taskList, chosenOption) {
  if (chosenOption === "done") {
    return taskList.filter((value) => value.isDone === true);
  } else if (chosenOption === "undone") {
    return taskList.filter((value) => value.isDone === false);
  }
  return taskList;
}

// window.addEventListener("load", () => {
//   checkLoginStatus();
// })
