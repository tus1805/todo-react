import { checkAdmin, checkIsLogin, getItemFromLocal, setItemToLocal, getTaskFromLocal, resetForm} from "./helper-verycool";

export function checkLoginStatus() {
  if (!checkIsLogin()) {
    alert('Please sign in first');
    window.location.href = "/sign-in"
    return;
  }
  localStorage.removeItem("currentProject");
  checkAdmin();
  showTableControl();
  renderProjectList();
  renderTaskOption();
  renderUserOption();
}

export function showTableControl() {
  if (!getItemFromLocal("currentProject")) {
    document.querySelector(".todo-list:nth-child(2)").style.display = "none";
    document.querySelector(".todo-list:nth-child(3)").style.display = "none";
  } else {
    document.querySelector(".todo-list:nth-child(2)").style.display = "block";
    document.querySelector(".todo-list:nth-child(3)").style.display = "block";
  }
}

//TO DO list
export function handleInputProject() {
  return document.getElementById("add-project-field").value;
}


export function addProject() {
  const newId = Math.floor(Math.random() * 10000000) + 1;
  const newProjectName = handleInputProject();
  const currentUsername = getItemFromLocal("currentUser").username;
  const newProject = { "projectId": newId, "projectName": newProjectName, "createBy": currentUsername, "updateBy": "", "isDone": false }
  const projectList = getProjectFromLocal();
  projectList.push(newProject);
  setItemToLocal("projectList", projectList);
  resetForm();
  renderProjectList();
}


export function renderProjectList(chosenOption) {
  const currentUsername = getItemFromLocal("currentUser").username;
  const userProjectList = getProjectFromLocal().filter(project => project.createBy === currentUsername).filter(value => value.isDeleted !== true);
  const projectList = handleFilter(userProjectList, chosenOption)
  let projectHTML = document.getElementById("project-list");
  projectHTML.innerHTML = '';
  projectIndexDone = [];
  projectList.forEach((value, index) => {
    projectHTML.innerHTML += projectItemContent(value.projectName, value.projectId);
    if (value.isDone === true) {
      projectIndexDone.push(index);
    }
  })
  checkDone(projectIndexDone)
}
export function checkDone(array) {
  array.forEach(value => {
    document.querySelectorAll("#checkbox")[value].checked = true;
  })
}

export function projectItemContent(projectName, id) {
  return `<div class="todo-item" onclick="showProject(${id})">
      <span class="todo-item-taskname">
      <input type="checkbox" key="${id}" id="checkbox" onclick="checkIsDone(${id})">
      <label>${projectName}</label>
      </span>
      <span class="todo-item-option">
      <button class="button-edit-task" onclick="editProject(${id})">Edit</button>
      <button class="button-delete-task" onclick="deleteProject(${id})">Delete</button>
      </span>
      </div>`
}

export function taskItemContent(taskName, id) {
  return `<div class="todo-item">
      <span class="todo-item-taskname">
      <label key="${id}">${taskName}</label>
      </span>
      </div>`
}

export function showProject(idProject) {
  getProjectFromLocal().forEach((project, index) => {
    if (project.projectId === idProject) {
      setItemToLocal("currentProject", project);
      document.getElementById("task-project-name").innerHTML = `Task list in Project ${project.projectName}`;
      document.getElementById("user-project-name").innerHTML = `User list in Project ${project.projectName}`;
    }
  })
  showTableControl();
  renderUserList();
  renderTaskList();
}

export function checkIsDone(key) {
  const projectList = getProjectFromLocal();
  projectList.forEach((value, index) => {
    if (value.id === key) {
      value.isDone = !value.isDone;
    }
  })
  setItemToLocal("projectList", projectList)
}

export function deleteProject(idProject) {
  const projectList = getProjectFromLocal();
  projectList.forEach((value, index) => {
    if (value.projectId !== idProject) {
      value.isDeleted = true;
    }
  });
  setItemToLocal("projectList", projectList);
  renderProjectList();
}

export function editProject(idProject) {
  const projectList = getProjectFromLocal();
  const editProject = projectList.forEach((value, index) => {
    if (value.projectId === idProject) {
      document.getElementById("add-project-field").value = value.projectName;
      setItemToLocal("ref", value.projectId)
    }
  }
  );
  document.querySelector(".button-update-task").style.display = "inline";
  document.querySelector(".button-add-task").style.display = "none";
  return editProject
}

export function updateProject() {
  const idRef = getItemFromLocal("ref");
  const updatedProjectName = handleInputProject();
  const projectList = getProjectFromLocal();
  projectList.forEach((value, index) => {
    if (value.projectId === idRef) {
      value.projectName = updatedProjectName;
    }
  });
  setItemToLocal("projectList", projectList);
  renderProjectList();
  resetForm();
}

//filter todolist
export function handleFilterOption() {
  const chosenOption = document.getElementById("filter").value;
  renderProjectList(chosenOption);
  return chosenOption;
}

export function handleFilter(projectList, chosenOption) {
  if (chosenOption === "done") {
    return projectList.filter(value => value.isDone === true);
  } else if (chosenOption === "undone") {
    return projectList.filter(value => value.isDone === false);
  }
  return projectList
}

window.addEventListener("load", () => {
  checkLoginStatus();
})

//Project control
//task
export function renderTaskOption() {
  const taskOption = document.getElementById("tasks");
  getItemFromLocal("taskList").forEach((task, index) => {
    const option = document.createElement("option");
    option.value = task.taskName;
    option.textContent = task.taskName;
    taskOption.appendChild(option);
  })
}
export function renderUserOption() {
  const userOption = document.getElementById("users");
  getItemFromLocal("userdata").forEach((user, index) => {
    const option = document.createElement("option");
    option.value = user.username;
    option.textContent = user.name;
    userOption.appendChild(option);
  })
}

export function getSelectedValue(id) {
  return document.getElementById(id).value
}

export function addUser() {
  const projectId = getItemFromLocal("currentProject").projectId;
  const username = getSelectedValue("users");
  const userSeletedData = getItemFromLocal("userdata").filter(value => value.username === username)[0]
  const name = userSeletedData.name;
  const newProjectUser = { "projectId": projectId, "username": username, "name": name }
  const projectUser = getItemFromLocal("projectUser") || [];
  projectUser.push(newProjectUser);
  setItemToLocal("projectUser", projectUser);
  renderUserList();
}

export function renderUserList() {
  let userContainer = document.getElementById("user-list");
  const currentProjectId = getItemFromLocal("currentProject").projectId;
  userContainer.innerHTML = '';
  const projectUser = getItemFromLocal("projectUser") || [];
  projectUser.forEach(project => {
    if (project.projectId === currentProjectId) {
      userContainer.innerHTML += `<p>${project.name}</p>`
    }
  })
}

export function addTask() {
  const projectId = getItemFromLocal("currentProject").projectId;
  const taskName = getSelectedValue("tasks");
  const taskList = getItemFromLocal("taskList");
  taskList.forEach(value => {
    if (value.taskName === taskName) {
      value.projectId = projectId;
    }
  });
  setItemToLocal("taskList", taskList);
  renderTaskList();
}

export function renderTaskList() {
  let taskContainer = document.getElementById("task-list");
  const currentProjectId = getItemFromLocal("currentProject").projectId;
  taskContainer.innerHTML = '';
  const taskList = getItemFromLocal("taskList") || [];
  taskList.forEach(task => {
    if (task.projectId === currentProjectId) {
      taskContainer.innerHTML += `<p>${task.taskName}</p>`
    }
  })
}