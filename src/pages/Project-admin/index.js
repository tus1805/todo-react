/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Option from "../../components/Option";
import List from "../../components/List";
import {
  getAllProject,
  createProject,
  editProject,
  getProjectById,
} from "../../API/project";
import ProjectItem from "../../components/List/ProjectItem";
import { getAllUser } from "../../API/user";
import { editTask, getAllTask, getTaskById } from "../../API/task";
import { createProjectUser, getAllProjectUser } from "../../API/project-user";

const ProjectAdmin = () => {
  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [currentProject, setCurrentProject] = useState();
  const [taskList, setTaskList] = useState([]);
  const [userList, setUserList] = useState([]);
  const currentUser = localStorage.getItem("userId");
  const [taskId, setTaskId] = useState("");
  const [userId, setUserId] = useState("");
  const [option, setOption] = useState("all");
  const [renderedUserList, setRenderedUserList] = useState([]);

  function handleInputProject(event) {
    setProjectName(event.target.value);
  }

  useEffect(() => {
    renderProject();
    renderUserOption();
    renderTaskOption();
    setTaskId(taskList?.[0]?._id);
    setUserId(userList?.[0]?._id);
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
    if (option === "done") {
      filteredProject = notDeleteProject.filter(
        (value) => value.isDone === true
      );
    } else if (option === "undone") {
      filteredProject = notDeleteProject.filter(
        (value) => value.isDone === false
      );
    }
    setProjectList(filteredProject);
  }

  async function handleProject(projectId) {
    const requestId = {
      _id: projectId,
    };
    const thisProject = await getProjectById(requestId);
    setCurrentProject(thisProject);
    renderTaskList();
    renderUserList();
  }

  async function addProject() {
    if (projectName === "") {
      return;
    }
    const newProject = {
      projectName: projectName,
      isDone: false,
      isDeleted: false,
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
    document.querySelector(".button-update-task").style.display = "none";
    document.querySelector(".button-add-task").style.display = "inline";
    setProjectName("");
  }
  function handleFilterOption(event) {
    setOption(event.target.value);
  }

  async function addUser() {
    const projectId = currentProject._id;
    const newProjectUser = {
      projectId: projectId,
      userId: userId,
    };
    await createProjectUser(newProjectUser);
    renderUserList();
  }

  async function renderUserList() {
    const projectId = currentProject?._id;
    const projectUserList = await getAllProjectUser();
    const filteredProjectUser = projectUserList.filter(
      (projectUser) => projectUser.projectId === projectId
    );
    const checkExistUserList = userList.filter(
      (user) =>
        filteredProjectUser.findIndex(
          (projectUser) => projectUser.userId === user._id
        ) !== -1
    );
    setRenderedUserList(checkExistUserList);
  }

  async function addTask() {
    const projectId = currentProject._id;
    const requestId = {
      _id: taskId,
    };
    console.log(requestId);
    const foundTask = await getTaskById(requestId);
    console.log("found task", foundTask);
    foundTask.projectId = projectId;
    await editTask(foundTask);
    renderTaskOption();
    renderTaskList();
    renderUserList();
  }

  function renderTaskList() {
    const currentProjectId = currentProject?._id;
    return taskList.filter(
      (task) => task.projectId === currentProjectId && task.isDeleted === false
    );
  }

  async function renderUserOption() {
    const userData = await getAllUser();
    const notDeleteUser = userData.filter((user) => user.isDeleted === false);
    setUserList(notDeleteUser);
  }

  async function renderTaskOption() {
    const taskData = await getAllTask();
    const notDeleteTask = taskData.filter((task) => task.isDeleted === false);
    setTaskList(notDeleteTask);
  }

  function handleTaskValue(event) {
    setTaskId(event.target.value);
  }

  function handleUserValue(event) {
    setUserId(event.target.value);
  }

  return (
    <Container containerName="l-container">
      <Container containerName="todo-container">
        <h1 id="welcome-message" className="welcome-message">
          Project Management
        </h1>
        <div className="todo-form">
          <Input
            inputId="add-task-field"
            inputClass="add-task-field"
            inputType="text"
            value={projectName}
            onChange={handleInputProject}
          />
          <Button
            buttonClass="button-add-task"
            buttonName="Add"
            onClick={addProject}
          />
          <Button
            buttonClass="button-update-task"
            buttonName="Update"
            onClick={updateProject}
          />
          <Button
            buttonClass="button-clear-task"
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
          <List listClass="todo-list">
            <h3>Project list</h3>
            <List listClass="project-list">
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
          <List listClass="todo-list">
            <h3 id="task-project-name">
              Task list in Project {currentProject?.projectName}
            </h3>
            <div className="todo-form">
              <Select selectId="tasks" onChange={handleTaskValue}>
                {taskList.map((task, index) => {
                  return (
                    <Option key={index} value={task._id} name={task.taskName} />
                  );
                })}
              </Select>
              <Button
                buttonClass="button-add-task"
                onClick={addTask}
                buttonName="Add"
              />
            </div>
            <List listId="task-list">
              {renderTaskList().map((task) => {
                return <p>{task.taskName}</p>;
              })}
            </List>
          </List>
          <List listClass="todo-list">
            <h3 id="user-project-name">
              User list in Project {currentProject?.projectName}{" "}
            </h3>
            <div className="todo-form">
              <Select selectId="users" onChange={handleUserValue}>
                {userList.map((user, index) => {
                  return (
                    <Option key={index} value={user._id} name={user.name} />
                  );
                })}
              </Select>
              <Button
                buttonClass="button-add-task"
                onClick={addUser}
                buttonName="Add"
              />
            </div>
            <List listId="user-list">
              {renderedUserList.map((user) => {
                return <p>{user.name}</p>;
              })}
            </List>
          </List>
        </Container>
      </Container>
    </Container>
  );
};

export default ProjectAdmin;
