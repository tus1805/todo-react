import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Option from "../../components/Option";
import List from "../../components/List";
import { getAllProject, createProject, editProject, getProjectById } from "../../API/project";
import ProjectItem from "../../components/List/ProjectItem";
import { getAllUser } from "../../API/user";
import { editTask, getAllTask } from "../../API/task";
import {getDataFromLocalByKey, setItemWithLocal} from "../../utils/process-data"

const ProjectAdmin = () => {
  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [currentProject, setCurrentProject] = useState();
  // const [currentUser, setCurrentUser] = useState();
  const currentUser = localStorage.getItem("userId")
  const [option, setOption] = useState("all");
  console.log(currentUser);
  console.log(currentProject)

  function handleInputProject(event) {
    setProjectName(event.target.value);
  }

  useEffect(() => {
    renderProject();
    // setCurrentUser(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    renderProject();
  }, [option]);

  async function renderProject() {
    const projectData = await getAllProject();
    const notDeleteProject = projectData.filter(
      (project) => project.isDeleted === false
    );
    let filteredProject = notDeleteProject;
    console.log(filteredProject)
    
    setProjectList(filteredProject);
  }

  async function handleProject(projectId) {
    const requestId = {
      _id : projectId
    }
    const thisProject = await getProjectById(requestId)
    console.log('23',thisProject);
    setCurrentProject(thisProject)
  }

  async function addProject(e) {
    if (projectName === "") {
      return;
    }
    const newProject = {
      projectName: projectName,
      isDone: false,
      isDeleted:false,
      createdBy: currentUser,
    };
    await createProject(newProject);
    resetForm();
    renderProject();
  }

  async function updateProject() {
    currentProject.projectName = projectName;
    await editProject(currentProject);
    renderProject();
    resetForm();
  }

  function resetForm() {
    document.querySelector(".button-update-project").style.display = "none";
    document.querySelector(".button-add-project").style.display = "inline";
    setProjectName("");
  }
  function handleFilterOption(event) {
    setOption(event.target.value);
  }
  function renderTaskOption() {
    const taskOption = document.getElementById("tasks");
    getDataFromLocalByKey("taskList").forEach((task, index) => {
      const option = document.createElement("option");
      option.value = task.taskName;
      option.textContent = task.taskName;
      taskOption.appendChild(option);
    })
  }
  function renderUserOption() {
    const userOption = document.getElementById("users");
    getDataFromLocalByKey("userdata").forEach((user, index) => {
      const option = document.createElement("option");
      option.value = user.username;
      option.textContent = user.name;
      userOption.appendChild(option);
    })
  }
  
  function getSelectedValue(id) {
    return document.getElementById(id).value
  }
  
  async function addUser() {
    const projectId = currentProject._id;
    const username = getSelectedValue("users");
    const userSeletedData = getDataFromLocalByKey("userdata").filter(value => value.username === username)[0]
    const name = userSeletedData.name;
    const newProjectUser = { "projectId": projectId, "username": username, "name": name }
    const projectUser = getDataFromLocalByKey("projectUser") || [];
    projectUser.push(newProjectUser);
    setItemWithLocal("projectUser", projectUser);
    renderUserList();
  }
  
  function renderUserList() {
    let userContainer = document.getElementById("user-list");
    const currentProjectId = getDataFromLocalByKey("currentProject").projectId;
    userContainer.innerHTML = '';
    const projectUser = getDataFromLocalByKey("projectUser") || [];
    projectUser.forEach(project => {
      if (project.projectId === currentProjectId) {
        userContainer.innerHTML += `<p>${project.name}</p>`
      }
    })
  }
  
  async function addTask() {
    const projectId = currentProject._id;
    const taskName = getSelectedValue("tasks");
    const taskList = await getAllTask();
    taskList.forEach(value => {
      if (value.taskName === taskName) {
        value.projectId = projectId;
      }
    });
    await editTask(taskList)
    renderTaskList();
  }
  
  function renderTaskList() {
    let taskContainer = document.getElementById("task-list");
    const currentProjectId = currentProject._id;
    taskContainer.innerHTML = '';
    const taskList = getDataFromLocalByKey("taskList") || [];
    taskList.forEach(task => {
      if (task.projectId === currentProjectId) {
        taskContainer.innerHTML += `<p>${task.taskName}</p>`
      }
    })
  }

  useEffect(()=> {
    renderUserOption()
    renderTaskOption()
  }, [])

  async function renderUserOption() {
    const userOption = document.getElementById("users");
    const userList = await getAllUser()
    userList.forEach((user, index) => {
      const option = document.createElement("option");
      option.value = user.username;
      option.textContent = user.name;
      userOption.appendChild(option);
    })
  }

  async function renderTaskOption() {
    const taskOption = document.getElementById("tasks");
    const taskList = await getAllTask()
    taskList.forEach((task, index) => {
      const option = document.createElement("option");
      option.value = task.taskName;
      option.textContent = task.taskName;
      taskOption.appendChild(option);
    })
  }

  return (
    <Container containerName="l-container">
      <Container containerName="todo-container">
        <h1 id="welcome-message" className="welcome-message">
          Project Management
        </h1>
        <div className="todo-form">
          <Input
            inputId="add-project-field"
            inputType="text"
            value={projectName}
            onChange={handleInputProject}
          />
          <Button
            buttonClass="button-add-project"
            buttonName="Add"
            onClick={addProject}
          />
          <Button
            buttonClass="button-update-project"
            buttonName="Update"
            onClick={updateProject}
          />
          <Button
            buttonClass="button-clear-project"
            buttonName="Clear"
            onClick={resetForm}
          />
        </div>
        <div className="filter-option">
          <Select
            name="filter"
            selectId="filter"
            selectClass="filter"
            onChange={handleFilterOption}
          >
            <Option value="all" name="All" />
            <Option value="done" name="Done" />
            <Option value="undone" name="Undone" />
          </Select>
        </div>
        <Container containerName="project-control-container">
          <List className="todo-list">
            <h3>Project list</h3>
            <List className="project-list" >
            {projectList.map((value) => {
            return (
              <ProjectItem
                key={value._id}
                projectId={value._id}
                projectName={value.projectName}
                setProjectName={setProjectName}
                setCurrentProject={setCurrentProject}
                renderProject={renderProject}
                isDone={value.isDone}
                onClick={() => handleProject(value._id)}
              />
            );
          })}
            </List>
          </List>
          <List className="todo-list">
            <h3 id="task-project-name">Task list in Project {currentProject?.projectName}</h3>
            <div className="todo-form">
              <Select selectId="tasks" ></Select>
              <Button buttonClass="button-add-task" onClick={addTask} buttonName="Add"/>
            </div>
            <List listId="task-list">
              
            </List>
          </List>
          <List className="todo-list">
            <h3 id="user-project-name">User list in Project {currentProject?.projectName} </h3>
            <div className="todo-form">
              <Select selectId="users"></Select>
              <Button buttonClass="button-add-task" onClick={addUser} buttonName="Add"/>
            </div>
            <List listId="user-list"></List>
          </List>
        </Container>
      </Container>
    </Container>
  );
};

export default ProjectAdmin;
